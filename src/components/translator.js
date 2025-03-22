export default function Translator() {
    const[inputFormat, setInputFormat] = useState('en');
    const[outputFormat, setOutputFormat] = useState('hi');
    const[translatedText, setTranslatedText] = useState('Translate');
    const[inputText, setInputText] = useState('');

    const handleReverseLanguage = () => {
        const value = inputFormat;
        setInputFormat = (outputFormat);
        setOutputFormat(value);
        setInputText('');
        setTranslatedText('Translation');
    }

    const handleRemoveInputText = () => {
        setInputText('');
        setTranslatedText('Translation');
    }


}