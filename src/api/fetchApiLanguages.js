
const API_KEY = 'WBBcwnwQpV89';

export const fetchLanguages = async (language, value) => {
    
    if (language === 'en-vi') {
        const URL = `https://api.tracau.vn/${API_KEY}/s/${value}/en`;
        const response = await fetch(URL);
        const data = await response.json();

        return data;
    }
    else if (language === 'vi-en') {
        const URL = `https://api.tracau.vn/${API_KEY}/s/${value}/vi`;
        const response = await fetch(URL);
        const data = await response.json();

        return data;
    }
    else if (language === 'fr-en-vi') {
        const URL = `https://api.tracau.vn/${API_KEY}/df/${value}`;
        const response = await fetch(URL);
        const data = await response.json();
        
        return data;
    }
    else if (language === 'ja-en-vi'){
        const URL = `https://api.tracau.vn/${API_KEY}/dj/${value}`;
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }

}
