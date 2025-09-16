import { fetchInscriptions, fetchCourses, fetchAllNotes } from './api';

export interface Course {
    mnemonique: string;
    intitule: string;
    credit: number;
    titulaire: string;
}

export interface StudentData {
    matricule: string;
    nom: string;
    prenom: string;
    annee: number;
    cours_json: { mnemonique: string }[];
    notes: { mnemonique: string; note: number }[];
}

export interface Bulletin {
    matricule: string;
    nom: string;
    prenom: string;
    annee: number;
    ects_total_inscrits: number;
    ects_obtenus: number;
    moyenne_ponderee: number | null;
    reussite: boolean;
    details: {
        mnemonique: string;
        intitule: string;
        credit: number;
        titulaire: string;
        note: number | null;
    }[];
}

export interface Anomaly {
    type: string;
    matricule: string;
    annee: number;
    detail: string;
}

export const generateReports = async () => {
    const [students, courses, notes] = await Promise.all([
        fetchInscriptions(),
        fetchCourses(),
        fetchAllNotes()
    ]);
    const bulletins: Bulletin[] = [];
    const anomalies: Anomaly[] = [];

    // Build course map for quick lookup
    const courseMap = new Map<string, Course>();
    courses.forEach((c: any) => {
        courseMap.set(c.mnemonique, {
            mnemonique: c.mnemonique,
            intitule: c.intitule,
            credit: c.credit,
            titulaire: c.titulaire
        });
    });

    // Build notes map and check for DUPLICATA_NOTE
    const notesMap = new Map<string, { note: number, id: number }>();
    notes.forEach((n: any) => {
        const key = `${n.matricule}-${n.mnemonique}`;
        if (notesMap.has(key)) {
            anomalies.push({
                type: 'DUPLICATA_NOTE',
                matricule: n.matricule,
                annee: n.annee || 0,
                detail: `Multiple notes for ${n.mnemonique}`
            });
        } else {
            notesMap.set(key, { note: n.note, id: n.id });
        }
    });

    // For each student/inscription
    students.forEach((student: any) => {
        let coursList: string[] = [];
        try {
            coursList = JSON.parse(student.cours_json);
        } catch (e) {
            anomalies.push({
                type: 'COURS_JSON_PARSE_ERROR',
                matricule: student.matricule,
                annee: student.annee_etude,
                detail: 'cours_json could not be parsed',
            });
        }

        // Check for INSCRIPTION_SANS_COURS
        if (!coursList || coursList.length === 0) {
            anomalies.push({
                type: 'INSCRIPTION_SANS_COURS',
                matricule: student.matricule,
                annee: student.annee_etude,
                detail: 'cours_json is empty',
            });
        }

        let ects_total_inscrits = 0;
        let ects_obtenus = 0;
        let sum_notes_credits = 0;
        let sum_credits_noted = 0;
        let has_all_notes = true;
        const bulletinDetails: any[] = [];
        const inscritsSet = new Set(coursList);

        coursList.forEach((mnemonique) => {
            const course = courseMap.get(mnemonique);
            if (!course) {
                anomalies.push({
                    type: 'COURS_INCONNU',
                    matricule: student.matricule,
                    annee: student.annee_etude,
                    detail: `Inscrit course ${mnemonique} not found in liste_cours`,
                });
            }
            const noteObj = notesMap.get(`${student.matricule}-${mnemonique}`);
            const note = noteObj ? noteObj.note : null;

            if (course) {
                ects_total_inscrits += course.credit || 0;
                if (note !== null && note !== undefined) {
                    sum_credits_noted += course.credit || 0;
                    sum_notes_credits += note * (course.credit || 0);
                    if (note >= 10) {
                        ects_obtenus += course.credit || 0;
                    }
                } else {
                    has_all_notes = false;
                }
                // NOTE_SANS_CREDIT
                if (note !== null && note !== undefined && (!course.credit || course.credit <= 0)) {
                    anomalies.push({
                        type: 'NOTE_SANS_CREDIT',
                        matricule: student.matricule,
                        annee: student.annee_etude,
                        detail: `Note found for course ${mnemonique} but credit is missing or invalid`,
                    });
                }
                bulletinDetails.push({
                    mnemonique: course.mnemonique,
                    intitule: course.intitule,
                    credit: course.credit,
                    titulaire: course.titulaire,
                    note: note !== undefined ? note : null,
                });
            } else {
                bulletinDetails.push({
                    mnemonique,
                    intitule: '',
                    credit: 0,
                    titulaire: '',
                    note: note !== undefined ? note : null,
                });
            }
        });

        // NOTE_SANS_INSCRIPTION
        notes.forEach((n: any) => {
            if (n.matricule === student.matricule && !inscritsSet.has(n.mnemonique)) {
                anomalies.push({
                    type: 'NOTE_SANS_INSCRIPTION',
                    matricule: n.matricule,
                    annee: student.annee_etude,
                    detail: `Note exists for ${n.mnemonique} but not in cours_json`,
                });
            }
        });

        const moyenne_ponderee = sum_credits_noted > 0 ? sum_notes_credits / sum_credits_noted : null;
        const reussite = ects_obtenus >= 60 || (has_all_notes && (moyenne_ponderee !== null && moyenne_ponderee >= 10));

        bulletins.push({
            matricule: student.matricule,
            nom: student.nom,
            prenom: student.prenom,
            annee: student.annee_etude,
            ects_total_inscrits,
            ects_obtenus,
            moyenne_ponderee,
            reussite,
            details: bulletinDetails.sort((a, b) => a.mnemonique.localeCompare(b.mnemonique)),
        });
    });

    return { bulletins, anomalies };
};
