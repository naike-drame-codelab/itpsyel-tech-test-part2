"use client";

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader,Alert } from 'react-bootstrap';
import { Bulletin } from '../../lib/bulletinService';

export default function Page() {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/bulletins');
        if (!res.ok) throw new Error('Failed to fetch bulletins.');
        const data = await res.json();
        setBulletins(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Container className="my-5"><p>Chargement...</p></Container>;
  }
  if (error) {
    return <Container className="my-5"><Alert variant="danger">Error: {error}</Alert></Container>;
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Bulletins ECTS des étudiants</h1>
      <hr />
      <Row>
        <Col>
          <h2>Bulletins par étudiant</h2>
          {bulletins.map((bulletin, index) => (
            <Card key={index} className="mb-4">
              <CardHeader as="h5">
                {bulletin.nom} {bulletin.prenom} ({bulletin.matricule}) - Année {bulletin.annee}
              </CardHeader>
              <CardBody>
                <Row className="mb-3">
                  <Col>
                    <strong>ECTS Inscrits :</strong> {bulletin.ects_total_inscrits}
                  </Col>
                  <Col>
                    <strong>ECTS Obtenus :</strong> {bulletin.ects_obtenus}
                  </Col>
                  <Col>
                    <strong>Moyenne Pondérée :</strong> {bulletin.moyenne_ponderee?.toFixed(2) ?? 'N/A'}
                  </Col>
                  <Col>
                    <strong>Réussite :</strong> <span className={bulletin.reussite ? 'text-success' : 'text-danger'}>{bulletin.reussite ? '✅ Oui' : '❌ Non'}</span>
                  </Col>
                </Row>
                <div className="details-list mt-3">
                  <h6>Détails des cours :</h6>
                  <ul className="list-unstyled">
                    {bulletin.details.map((course, i) => (
                      <li key={i}>
                        <strong>{course.mnemonique}</strong> : {course.intitule} ({course.credit} crédits) - Note : {course.note ?? 'N/A'}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
