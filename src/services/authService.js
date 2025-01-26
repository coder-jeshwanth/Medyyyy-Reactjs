const login = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    return data;
};

export default {
    login,
};