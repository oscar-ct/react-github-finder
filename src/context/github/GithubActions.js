

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;


export const fetchSearch = async (text) => {
    // const params = new URLSearchParams({
    //     q: text
    // });
    const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
        headers: {
            Authorization: `${GITHUB_TOKEN}`
        }
    });
    const {items} = await response.json();

    return items;

}