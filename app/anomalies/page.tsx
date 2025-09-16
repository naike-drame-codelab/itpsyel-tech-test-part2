"use client";

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Alert } from 'react-bootstrap';
import { Anomaly } from '../../lib/bulletinService';

export default function Page() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/anomalies');
        if (!res.ok) throw new Error('Failed to fetch anomalies.');
        const data = await res.json();
        setAnomalies(data);
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
      <h1 className="mb-4">Rapport d'anomalies</h1>
      <hr />
      <Row className="mb-5">
        <Col>
          <h2>Rapport d'anomalies</h2>
          {anomalies.length > 0 ? (
            <div className="anomaly-list">
              {anomalies.map((anomaly, index) => (
                <Card key={index} className="mb-2">
                  <CardBody>
                    <CardTitle>Type: {anomaly.type}</CardTitle>
                    <CardText>
                      <strong>Matricule :</strong> {anomaly.matricule}<br />
                      <strong>Année :</strong> {anomaly.annee}<br />
                      <strong>Détails :</strong> {anomaly.detail}
                    </CardText>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <Alert variant="success">Aucune anomalie détectée.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
