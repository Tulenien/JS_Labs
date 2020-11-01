"use strict";

window.onload = function() {
    // input fields
    const f1 = document.getElementById("field-first");
    const f2 = document.getElementById("field-second");

    // button
    const btn = document.getElementById("sum-find-btn");

    // label
    const label = document.getElementById("result-label");

    // ajax get
    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    };

    // click event
    btn.onclick = function() {
        const a = f1.value;
        const b = f2.value;
        const url = `/sum?a=${a}&b=${b}`;
        ajaxGet(url, function(stringAnswer) {
            const objectAnswer = JSON.parse(stringAnswer);
            const result = objectAnswer.result;
            label.innerHTML = `Ответ: ${result}`;
        });
    };
};