'use strict'

const APIURL = 'http://localhost:3001/api';


// Authentication

//USER RELATED APIs
const logIn = async (credentials) => {

    const url = APIURL + '/sessions';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });

    if (response.ok) {
        const user = await response.json();
        return user;
    }
    else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

const getUserInfo = async () => {
    const url = APIURL + '/sessions/current';
    const response = await fetch(url, {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        throw user;  // an object with the error coming from the server
    }
};

const logOut = async () => {
    const url = APIURL + '/sessions/current';
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
}

async function getCourses() {
    const url = APIURL + `/courses`;
    try {
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (response.ok) {
            // process the response
            let list = await response.json();
            const courses = list.map((course) => ({ Code: course.Code, Name: course.Name, Credits: course.Credits, Max_Students: course.Max_Students, Incompatible_Courses: course.Incompatible_Courses, Preparatory_Course: course.Preparatory_Course }));
            return courses;
        } else {
            // application error (404, 500, ...)
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        throw ex;
    }
}

const API = { getCourses, logIn, getUserInfo, logOut }
export default API