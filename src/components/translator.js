import React, { useState } from 'react';
import './translator.css';
import languageList from './language.json';

export default function Translator() {
    const [inputFormat, setInputFormat] = useState('en');
    const [outputFormat, setOutputFormat] = useState('hi');
    const [translatedText, setTranslatedText] = useState('Translate');
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReverseLanguage = () => {
        setInputFormat(outputFormat);
        setOutputFormat(inputFormat);
        setInputText('');
        setTranslatedText('Translation');
    };

    const handleRemoveInputText = () => {
        setInputText('');
        setTranslatedText('Translation');
    };

    const handleTranslate = async () => {
        if (!inputText.trim()) return;

        setLoading(true);

        try {
            const response = await fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0', {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': '493c6b9bf9msh960e422fd70b14ep1df1abjsn7b328fcec9e5',
                    'Ocp-Apim-Subscription-Region': 'YOUR_REGION',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{ Text: inputText }])
            });

            const result = await response.json();
            setTranslatedText(result[0]?.translations[0]?.text || 'Translation Failed');
        } catch (error) {
            console.error('Translation error:', error);
            alert('Translation failed. Please check your API key and internet connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row1">
                <select value={inputFormat} onChange={(e) => setInputFormat(e.target.value)}>
                    {Object.keys(languageList).map((key) => (
                        <option key={key} value={key}>{languageList[key].name}</option>
                    ))}
                </select>
                <svg className="reversesvg" onClick={handleReverseLanguage} viewBox="0 0 24 24">
                    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
                </svg>
                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
                    {Object.keys(languageList).map((key) => (
                        <option key={key} value={key}>{languageList[key].name}</option>
                    ))}
                </select>
            </div>
            <div className="row2">
                <div className="inputText">
                    <svg className="removeinput" style={{ display: inputText ? 'block' : 'none' }} onClick={handleRemoveInputText} viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                    <textarea value={inputText} placeholder="Enter Text" onChange={(e) => setInputText(e.target.value)} />
                </div>
                <div className="outputText">{loading ? 'Translating...' : translatedText}</div>
            </div>
            <div className="row3">
                <button className="btn" onClick={handleTranslate} disabled={loading}>
                    {loading ? <i className="fa fa-spinner fa-spin"></i> : <span className="translate">Translate</span>}
                </button>
            </div>
        </div>
    );
}
