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

    const handleTranslate = () => {
        if(!inputText || !inputFormat || !outputFormat) return;
        document.querySelector('.fa.fa-spinner.fa-spin').style.display = 'block';
            document.querySelector('.translate').style.display = 'none';
    }


}