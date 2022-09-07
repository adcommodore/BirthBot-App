import { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';

function TextAnimation({ text }) {
    const index = useRef(0);
    const [ currentText, setCurrentText ] = useState('');

    useEffect(() => {
        index.current = 0;
        setCurrentText('');
    }, [text])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentText((value) => value + text.charAt(index.current))
            index.current += 1;
        }, 100);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [currentText, text])

    return (
        <Container>
            <h1>{ currentText }</h1>
        </Container>
        
    )
}

export default TextAnimation