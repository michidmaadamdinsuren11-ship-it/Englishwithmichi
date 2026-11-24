const materialsData = {
    lecture: {
        title: "Лекц & Презентац (Дүрэм & Бичих ур чадвар)",
        items: [
            {
                name: "1-р хичээл: Present Simple & Present Continuous (BBC Learning English)",
                url: "https://www.youtube.com/watch?v=xFsYrTIndhI"
            },
            {
                name: "2-р хичээл: IELTS Writing Task 1 Introduction (IELTS Liz)",
                url: "https://www.youtube.com/watch?v=oTe_2hmSHvw"
            },
            {
                name: "3-р хичээл: Essay Structure for IELTS Writing Task 2 (LarRyan)",
                url: "https://www.youtube.com/watch?v=sA8bE2QxY3o"
            }
        ],
        note: "«Нээх ↗» товч дээр дарахад бэлэн YouTube хичээл шинэ цонхонд нээгдэнэ."
    },
    video: {
        title: "Видео & Сонсгол / Дуудлага (BBC Learning English)",
        items: [
            {
                name: "Дуудлага ба ярианы дадлага: Pronunciation Live",
                url: "https://www.youtube.com/watch?v=pzqQO3R6tEE"
            },
            {
                name: "Нэмэлт дуудлагын хичээл: Pronunciation Live Session",
                url: "https://www.youtube.com/watch?v=S808cWhaxAA"
            },
            {
                name: "Цуврал хичээлүүд: BBC Learning English Playlists",
                url: "https://www.youtube.com/c/bbclearningenglish/playlists"
            }
        ],
        note: "Эдгээр линкээр дамжуулан сонсгол, дуудлага, үгийн сангийн видеонуудыг шууд үзэж болно."
    }
};

function openMaterial(type) {
    const data = materialsData[type];
    if (!data) return;

    document.getElementById("material-title").textContent = data.title;

    const listHtml = data.items
        .map(item => `
            <li>
                <span>${item.name}</span>
                <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="material-link">Нээх ↗</a>
            </li>
        `)
        .join("");
    document.getElementById("material-body").innerHTML = `
        <ul class="styled-list material-list">${listHtml}</ul>
        <p class="viewer-note">${data.note}</p>
    `;
    const viewer = document.getElementById("material-viewer");
    viewer.style.display = "block";
    viewer.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeMaterial() {
    document.getElementById("material-viewer").style.display = "none";
}
const quizData = [
    {
        question: "1. She usually _____ coffee in the morning.",
        options: ["drinks", "is drinking", "drink"],
        answer: 0,
        explanation: "'Usually' нь давтамж заах тул Present Simple ('drinks') хэрэглэнэ."
    },
    {
        question: "2. Look! The students _____ notes right now.",
        options: ["take", "are taking", "takes"],
        answer: 1,
        explanation: "'Look!' болон 'right now' нь яг одоо болж буй үйлдлийг заах тул Present Continuous ('are taking') хэрэглэнэ."
    },
    {
        question: "3. I _____ English grammar every evening.",
        options: ["am studying", "studies", "study"],
        answer: 2,
        explanation: "'Every evening' нь тогтмол давтагдах үйлдэл тул 'I'subject-тэй 'study' хэлбэр тохирно."
    }
];

function renderQuiz() {
    const container = document.getElementById("quiz-questions");
    if (!container) return;

    container.innerHTML = quizData
        .map((q, qIndex) => {
            const optionsHtml = q.options
                .map((opt, oIndex) => `
                    <label class="quiz-option">
                        <input type="radio" name="q${qIndex}" value="${oIndex}">
                        <span>${opt}</span>
                    </label>
                `)
                .join("");

            return `
                <div class="quiz-item">
                    <p class="quiz-question"><strong>${q.question}</strong></p>
                    <div class="quiz-options">${optionsHtml}</div>
                </div>
            `;
        })
        .join("");
}

function checkQuiz() {
    let score = 0;
    let feedbackHtml = "";

    quizData.forEach((q, qIndex) => {
        const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
        const userAns = selected ? Number(selected.value) : -1;

        if (userAns === q.answer) {
            score++;
            feedbackHtml += `<p class="correct">✓ ${q.question} — Зөв! (${q.explanation})</p>`;
        } else {
            feedbackHtml += `<p class="wrong">✕ ${q.question} — Зөв хариулт: <strong>${q.options[q.answer]}</strong>. (${q.explanation})</p>`;
        }
    });

    const resultBox = document.getElementById("quiz-result");
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h4>Таны оноо: ${score} / ${quizData.length}</h4>
        ${feedbackHtml}
    `;
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function resetQuiz() {
    renderQuiz();
    const resultBox = document.getElementById("quiz-result");
    resultBox.style.display = "none";
    resultBox.innerHTML = "";
}

renderQuiz();
