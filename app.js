const keys = document.querySelectorAll('.key');

const c_major = document.querySelector('input[value="c-major"]')
const f_major = document.querySelector('input[value="f-major"]')
const g_major = document.querySelector('input[value="g-major"]')
const a_minor = document.querySelector('input[value="a-minor"]')
const e_major7 = document.querySelector('input[value="e-major7"]')
const e_minor = document.querySelector('input[value="e-minor"]')


const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const resetKeyColours = () => {
    keys.forEach(key => {
        if (key.className === "key black-key") {
            key.style.backgroundColor = "black"
        } else {
            key.style.backgroundColor = "white"
        }
    })
}

const setKeyColours = (keys) => {
    keys.forEach(key => {
        key.style.backgroundColor = "green"
    })
}


c_major.addEventListener('change', () => {
    resetKeyColours()
    const c = document.querySelector("div[data-note=C]")
    const e = document.querySelector("div[data-note=E]")
    const g = document.querySelector("div[data-note=G]")
    const c2 = document.querySelector("div[data-note=C2]")

    const keys = [c, e, g, c2]

    setKeyColours(keys)
})

f_major.addEventListener('change', () => {
    resetKeyColours()
    const f = document.querySelector("div[data-note=F]")
    const a = document.querySelector("div[data-note=A]")
    const c = document.querySelector("div[data-note=C]")
    const c2 = document.querySelector("div[data-note=C2]")

    const keys = [f, a, c, c2]

    setKeyColours(keys)
})

g_major.addEventListener('change', () => {
    resetKeyColours()
    const g = document.querySelector("div[data-note=G]")
    const b = document.querySelector("div[data-note=B]")
    const d = document.querySelector("div[data-note=D]")

    const keys = [g, b, d]

    setKeyColours(keys)
})

a_minor.addEventListener('change', () => {
    resetKeyColours()
    const a = document.querySelector("div[data-note=A]")
    const c = document.querySelector("div[data-note=C]")
    const e = document.querySelector("div[data-note=E]")
    const c2 = document.querySelector("div[data-note=C2]")

    const keys = [a, c, e, c2]

    setKeyColours(keys)
})

e_major7.addEventListener('change', () => {
    resetKeyColours()
    const e = document.querySelector("div[data-note=E]")
    const d = document.querySelector("div[data-note=D]")
    const g_sharp = document.querySelector("div[data-note=G-sharp]")
    const b = document.querySelector("div[data-note=B]")

    const keys = [e, d, g_sharp, b]

    setKeyColours(keys)
})

e_minor.addEventListener('change', () => {
    resetKeyColours()
    const e = document.querySelector("div[data-note=E]")
    const g = document.querySelector("div[data-note=G]")
    const b = document.querySelector("div[data-note=B]")

    const keys = [e, g, b]

    setKeyColours(keys)
})

keys.forEach(key => {
    key.addEventListener('click', () => {
        key.style.boxShadow = "2px 4px 5px"
        key.style.backgroundColor = "#ff2b64"
        const note = key.getAttribute('data-note');
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(getFrequency(note), audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        setTimeout(() => {
            key.style.boxShadow = "none"
            if (key.className === "key black-key") {
                key.style.backgroundColor = "black"
            } else {
                key.style.backgroundColor = "white"
            }

        }, 500)

    });



});

const handleClick = (note, noteDuration, oscillator, frequency) => {
    note = document.querySelector(`div[data-note=${note}]`)
    note.style.boxShadow = "2px 4px 5px"
    note.style.backgroundColor = "#ff2b64"
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + noteDuration);
    setTimeout(() => {
        note.style.boxShadow = "none"
        if (note.className === "key black-key") {
            note.style.backgroundColor = "black"
        } else {
            note.style.backgroundColor = "white"
        }

    }, noteDuration * 1000)
}

window.addEventListener('keydown', (e) => {
    const oscillator = audioContext.createOscillator();
    const noteDuration = 0.2

    switch (e.code) {
        case "Digit1":
            handleClick("C", noteDuration, oscillator, 261.63)
            break;
        case "Digit2":
            handleClick("C-sharp", noteDuration, oscillator, 277.18)
            break;
        case "Digit3":
            handleClick("D", noteDuration, oscillator, 293.66)
            break;
        case "Digit4":
            handleClick("D-sharp", noteDuration, oscillator, 311.13)
            break;
        case "Digit5":
            handleClick("E", noteDuration, oscillator, 329.63)
            break;
        case "Digit6":
            handleClick("F", noteDuration, oscillator, 349.23)
            break;
        case "Digit7":
            handleClick("F-sharp", noteDuration, oscillator, 369.99)
            break;
        case "Digit8":
            handleClick("G", noteDuration, oscillator, 392.00)
            break;
        case "Digit9":
            handleClick("G-sharp", noteDuration, oscillator, 415.30)
            break;
        case "Digit0":
            handleClick("A", noteDuration, oscillator, 440.00)
            break;
        case "Minus":
            handleClick("A-sharp", noteDuration, oscillator, 466.16)
            break;
        case "Equal":
            handleClick("B", noteDuration, oscillator, 493.88)
            break;
        case "Backspace":
            handleClick("C2", noteDuration, oscillator, 523.25)
            break;
        default:
            break;
    }


});

function getFrequency(note) {
    const notes = {
        'C': 261.63,
        'C-sharp': 277.18,
        'D': 293.66,
        'D-sharp': 311.13,
        'E': 329.63,
        'F': 349.23,
        'F-sharp': 369.99,
        'G': 392.00,
        'G-sharp': 415.30,
        'A': 440.00,
        'A-sharp': 466.16,
        'B': 493.88,
        'C2': 523.25,
    };
    return notes[note];
}