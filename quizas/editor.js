let questions =
    JSON.parse(localStorage.getItem("questions")) || [];

function addQuestion() {

    const question =
        document.getElementById("question").value;

    const answer1 =
        document.getElementById("answer1").value;

    const answer2 =
        document.getElementById("answer2").value;

    const answer3 =
        document.getElementById("answer3").value;

    const answer4 =
        document.getElementById("answer4").value;

    const correct =
        parseInt(
            document.getElementById("correct").value
        );

    questions.push({

        question: question,

        answers: [
            answer1,
            answer2,
            answer3,
            answer4
        ],

        correct: correct

    });

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    console.log(questions);

    alert(
        `Question Added. Total Questions: ${questions.length}`
    );
}

function downloadJSON() {

    const json =
        JSON.stringify(
            questions,
            null,
            4
        );

    const blob =
        new Blob(
            [json],
            {
                type: "application/json"
            }
        );

    const link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "questions.json";

    link.click();
}