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
            const courses = list.map((course) => ({ Code: course.Code, Name: course.Name, Credits: course.Credits, Max_Students: course.Max_Students, Enrolled_In: course.Enrolled_In,  Incompatible_Courses: course.Incompatible_Courses, Preparatory_Course: course.Preparatory_Course }));
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


async function updateEnrollments(code) {
    const url = APIURL + `/enroll/${code}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

async function decrementEnrollment(code) {
    const url = APIURL + `/unsubscribe/${code}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}


// STUDY PLAN API

async function studyPlanInit(option) {
    const url = APIURL + '/init';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(option), //capire come passare anche l'utente una volta fatte le sessioni, ora passo un valore fittizio in server
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

const getOption = async () => {
    const response = await fetch(APIURL + '/option',
        {
            credentials: 'include',
        }
    );

    if (response.ok) {
        let option = await response.json();
        return option;
    }
    else{
        const text = await response.text();
        throw new TypeError(text);
    }
        
};

const getUserStudyPlan = async () => {
    const response = await fetch(APIURL + '/studyplan',
        {
            credentials: 'include',
        }
    );

    if (response.ok) {
        let studyPlan = await response.json();
        return studyPlan;
    }
    else{
        const text = await response.text();
        throw new TypeError(text);
    }
        
};

async function addStudyPlan(studyPlan) {
    const url = APIURL + '/newStudyPlan';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(studyPlan), //capire come passare anche l'utente una volta fatte le sessioni, ora passo un valore fittizio in server
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

async function destroyStudyPlan(studyPlan) {
    const url = APIURL + `/destroy`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(studyPlan),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if (response.ok) {
            return true;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}






const API = { getCourses, logIn, getUserInfo, logOut, getUserStudyPlan, addStudyPlan, destroyStudyPlan, updateEnrollments, decrementEnrollment, studyPlanInit, getOption }
export default API