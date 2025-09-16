
import Link from 'next/link';
import { Container, Row, Col, Card, CardBody, Button } from 'react-bootstrap';

export default function Page() {

  return (
    <main className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="display-4 mb-4">
              Application des Bulletins ECTS
            </h1>
            <p className="lead mb-5">
              Générations des bulletins de notes détaillés et un rapport d'anomalies pour le contrôle qualité.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <CardBody className="text-center">
                <h5 className="card-title">Bulletins ECTS</h5>
                <p className="card-text">
                  Page des bulletins de notes pour chaque étudiant et chaque année.
                </p>
                <Link href="/bulletins" passHref>
                  <Button variant="primary" className="mt-3">
                    Voir les Bulletins
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <CardBody className="text-center">
                <h5 className="card-title">Rapport d'Anomalies</h5>
                <p className="card-text">
                  Page regroupant les anomalies détectées dans les bulletins.
                </p>
                <Link href="/anomalies" passHref>
                  <Button variant="info" className="mt-3">
                    Voir le Rapport
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
