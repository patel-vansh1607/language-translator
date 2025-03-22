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

    const url = 
`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${outputFormat}&api-version=3.0&profanityAction=NoAction&textType=plain`;
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': {"YOUR_API_KEY"},
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            body: JSON.stringify([
                {
                    Text: inputText
                }
            ])
        };
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const responseObject = JSON.parse(result);
            const translation = responseObject[0].translations[0].text;
            setTranslatedText(translation);
        } catch (error) {
            console.log(error);
            alert("Please Try Again! Some Error Occurred at your side");
        }
        document.querySelector('.fa.fa-spinner.fa-spin').style.display = "none";
        document.querySelector('.translate').style.display = 'block';
    }

}