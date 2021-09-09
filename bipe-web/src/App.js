import React, { useEffect, useState } from 'react';
import { Button, Alert, Container, Row, Col, Collapse, Spinner, Card, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, ButtonGroup} from 'reactstrap';

import CoreApiClient from './integrations/coreApiClient';

const App = () => {

    const [ startAnswering, setStartAnsering ] = useState(false);
    const [ answering, setAnsering ] = useState(false);
    const [ currQuestion, setCurrentQuestion ] = useState();
    const [ currAnswers, setCurrentAnswers ] = useState();
    const [ remainningTime, setRemainningTime ] = useState(120);

    const [ pausedCounter, pauseCounter ] = useState(false);

    const [ choosenAnswer, chooseAnswer ] = useState();

    const [ points, setPoints ] = useState(0);

    const [ fetchingAnswer, setFetchingAnser ] = useState(false);

    useEffect(() => {
        CoreApiClient.Login('admin', 'admin');
        setInterval(() => CoreApiClient.Login('admin', 'admin'), 60000);
    }, []);

    useEffect(() => {
        if(startAnswering && !currQuestion && !currAnswers)
            CoreApiClient.NextFlashcard()
                .then(({ question }) => {
                    if(question) {
                        setCurrentQuestion(question);
                        setCurrentAnswers(question.answers.sort(() => Math.random() - 0.5));
                        setAnsering(true);
                    }
                })
    }, [startAnswering, currQuestion, currAnswers]);

    useEffect(() => {
        if(!pausedCounter && startAnswering && answering)
            if(remainningTime > 0)
                setTimeout(() => setRemainningTime(remainningTime - 1), 1000);
            else {
                setRemainningTime(null);
                setAnsering(false);
            }
    }, [startAnswering, answering, remainningTime, pausedCounter]);

    useEffect(() => {
        if(startAnswering && !pausedCounter && !answering && !remainningTime) {
            setStartAnsering(false);
            setRemainningTime(120);
        }
    }, [startAnswering, answering, remainningTime, pausedCounter]);

    useEffect(() => {
        if(choosenAnswer != null)
            pauseCounter(true);
    }, [choosenAnswer]);

    useEffect(() => {
        if(choosenAnswer != null && pausedCounter && currQuestion && !fetchingAnswer) {
            setFetchingAnser(true);

            CoreApiClient.AnswerFlashcard(currQuestion.id, choosenAnswer)
                .then(({ result }) => {
                    if(result && result.isCorrect)
                        setPoints(points + currQuestion.maxPoints);
                    
                    setAnsering(false);
                    setStartAnsering(false);

                    setTimeout(() => {
                        setCurrentQuestion(null);
                        setCurrentAnswers(null);
                        pauseCounter(false);
                        chooseAnswer(null);
                        setRemainningTime(120);
                        setFetchingAnser(false);
                    }, 200);
                });
        }
    }, [choosenAnswer, pausedCounter, points, currQuestion, fetchingAnswer]);

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col xs='12'>
                        <Alert color="info">
                            Este é um teste da funcionalidade de Flashcards. Os cartões aparecem toda vez 
                            que o usuário clicar no botão "Próximo" abaixo. Enquanto estiver contando o tempo 
                            do cartão, não é possível escolher um próximo.
                        </Alert>
                    </Col>
                    <Col xs='12'>
                        <h3>Pontuação: {points} Lp</h3>
                    </Col>
                </Row>
                <Row style={{height: '25rem', display: 'flex', alignItems: 'center'}}>
                    <Col xs={{size: 4, offset: 4}} style={{display: 'flex', justifyContent: 'center'}}>
                            {
                                startAnswering && !answering && (
                                    <Spinner color="primary" />
                                )
                            }

                            {
                                startAnswering && answering && (
                                    <Collapse isOpen={startAnswering && answering}>
                                        <Card>
                                            <CardHeader>Tempo: {remainningTime} segundo{`${remainningTime > 1 ? 's' : ''}`}</CardHeader>
                                            <CardBody>
                                                <CardTitle tag="h5">Valendo {currQuestion.maxPoints} pontos</CardTitle>
                                                <CardText><div dangerouslySetInnerHTML={{__html: currQuestion.content}} /></CardText>
                                            </CardBody>
                                            <CardFooter>
                                                <ButtonGroup vertical style={{width: '100%'}}>
                                                    <ButtonGroup>
                                                        <Button onClick={() => chooseAnswer(currAnswers[0].id)}><div dangerouslySetInnerHTML={{__html: currAnswers[0].content}} /></Button> 
                                                        <Button onClick={() => chooseAnswer(currAnswers[1].id)}><div dangerouslySetInnerHTML={{__html: currAnswers[1].content}} /></Button>
                                                    </ButtonGroup>
                                                    <ButtonGroup>
                                                        <Button onClick={() => chooseAnswer(currAnswers[2].id)}><div dangerouslySetInnerHTML={{__html: currAnswers[2].content}} /></Button> 
                                                        <Button onClick={() => chooseAnswer(currAnswers[3].id)}><div dangerouslySetInnerHTML={{__html: currAnswers[3].content}} /></Button>
                                                    </ButtonGroup>
                                                </ButtonGroup>
                                            </CardFooter>
                                        </Card>
                                    </Collapse>
                                )
                            }
                    </Col>
                    
                    <Col xs={{size: 4, offset: 4}} style={{textAlign: 'center'}}>
                        <Button color="primary" onClick={()=>setStartAnsering(true)} disabled={startAnswering}>
                            Próximo
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
