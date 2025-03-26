
/*https://github.com/IseeJ
Please don't use my code without permission!*/
document.addEventListener("DOMContentLoaded", function () {
    let resultPage = document.getElementById("result-page");

    function checkAndTriggerGif() {
        if (resultPage.style.display !== "none") { 
            let randomInterval = Math.floor(Math.random() * 70000) + 10000;
            setTimeout(showFloatingGif, randomInterval); 
        }
    }

    function showFloatingGif() {
        if (resultPage.style.display === "none") return;

        let gif = document.createElement("img");
        gif.src = "IMG/Heh/C9.gif";  
        gif.style.position = "absolute";
        gif.style.top = Math.random() * (window.innerHeight - 150) + "px"; 
        gif.style.right = "-200px";
        gif.style.width = "150px";
        gif.style.cursor = "pointer";
        gif.style.animation = "floatUpDown 3s ease-in-out infinite"; 
        
        gif.onclick = function () {
            window.open("new.html", "_blank"); 
        };
        document.body.appendChild(gif);

        setTimeout(() => {
            gif.style.transition = "right 7s linear";
            gif.style.right = window.innerWidth + "px"; 
        }, 100);

        setTimeout(() => {
            gif.remove();
        }, 6000);
        checkAndTriggerGif();
    }

    let observer = new MutationObserver(checkAndTriggerGif);
    observer.observe(resultPage, { attributes: true, attributeFilter: ["style"] });

    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes floatUpDown {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); } /* Moves up */
            100% { transform: translateY(0px); } /* Moves back down */
        }
    `;
    document.head.appendChild(style);
});





document.getElementById('start1-button').addEventListener('click', function () {
    const popSound = document.getElementById('popSound');
    popSound.play();
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('interm').style.display = 'flex';
});

document.getElementById('start-button').addEventListener('click', function () {
    const notifSound = document.getElementById('notifSound');
    notifSound.play();
    document.getElementById('interm').style.display = 'none';
    document.getElementById('phone-screen').style.display = 'flex';
});

let currentMessageIndex = 0;
const scores = { B: 0, S: 0, W: 0, G: 0, P: 0, D: 0, A: 0, R: 0 };

const dialogue = [
    // 0 (0)
    {
        speaker: 'bot',
        text: ["*New notification from Unknown*"],
        choices: [
            { id: 1, text: '*Open*', type: 'A', weight: 2, next: 2, followUpText: [] },
            { id: 2, text: '*Ignore it*', type: 'R', weight: 2, next: 1, followUpText: [] },
            //{ id: 2, text: 'DEBUG', type: 'O', weight: 0, next: 100, followUpText: [] },
        ]
    },
    // 1
    {
        speaker: 'bot',
        text: ['*Are you sure? It could be important!*'],
        choices: [
            { id: 1, text: 'FINE I\'ll open it', type: 'O', weight: 1, next: 2, followUpText: [] },
        ]
    },
    // 2 (2)
    {
        speaker: 'bot',
        text: ['Hey hey hey! Happy Valentine\'s Day!'],
        choices: [
            { id: 1, text: 'I think you got the wrong number', type: 'B', weight: 2, next: 3, followUpText: [] },
            { id: 2, text: 'Thanks, but who r u?', type: 'S', weight: 2, next: 4, followUpText: [] },
            { id: 3, text: '*don\'t reply, it could be a scam!*', type: 'W', weight: 2, next: 5, followUpText: [] },
        ]
    },

    // 3 (3_1)
    {
        speaker: 'bot',
        text: ['Wrong number?! Pfftt that\'s not possible', "You summoned me afterall...","You're the one playing this quiz on Valentine's Day!"],
        choices: [
            { id: 1, text: 'Summoned you?', type: 'G', weight: 1, next: 6, followUpText: [] },
            { id: 2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6, followUpText: [] },
            { id: 3, text: 'Who are you?!', type: 'D', weight: 1, next: 6, followUpText: [] }
        ]
    },
    // 4 (3_2)
    {
        speaker: 'bot',
        text: ['Me? You know me!', 'You summoned me just now.', "Wasn't it you who want to play this quiz on Valentine's Day?"],
        choices: [
            { id: 1, text: 'Summoned you?', type: 'G', weight: 1, next: 6, followUpText: [] },
            { id: 2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6, followUpText: [] },
            { id: 3, text: 'No srly! Who are you?!', type: 'D', weight: 1, next: 6, followUpText: [] }
        ]
    },
    // 5 (3_3)
    {
        speaker: 'bot',
        text: ["Oh don't ignore me", "You're the one who summoned me!", "Didn't you want to play this quiz on Valentine's Day?"],
        choices: [
            { id: 1, text: 'Summoned you?', type: 'G', weight: 1, next: 6, followUpText: [] },
            { id: 2, text: 'lol idk what ur talking abt', type: 'P', weight: 1, next: 6, followUpText: [] },
            { id: 3, text: 'Who are you?!', type: 'D', weight: 1, next: 6, followUpText: [] }
        ]
    },

    // 6 (4)
    {
        speaker: 'bot',
        text: ["Ok ok, I'll explain everything", "I'm your personal Cupid!", "Your love life is my job!!"],
        choices: [
            { id: 1, text: "Oh really? Clearly you need to work harder", type: 'P', weight: 2, next: 7, followUpText: [] },
            { id: 2, text: "Ok Cupid, what do you want?", type: 'G', weight: 2, next: 8, followUpText: [] },
            { id: 3, text: "I thought this was just a personality quiz...", type: 'D', weight: 2, next: 8, followUpText: [] },

        ]
    },

    // 7 (5_1)
    {
        speaker: 'bot',
        text: ["Ouch! I'm trying my best here!", "Anyways, I'm here to ask you 12 questions", "Cupid's duty! We do this once a year!"],
        choices: [
            { id: 1, text: "Fine, I'll do it", type: 'R', weight: 1, next: 10, followUpText: [] },
            { id: 2, text: "Sounds fun, I'm down!", type: 'A', weight: 1, next: 10, followUpText: ["Hopefully this helps improve your Cupid performance!"] },
        ]
    },
    // 8 (5_2, 5_3)
    {
        speaker: 'bot',
        text: ["Straight to the point, I see", "I'm here to ask you 12 questions", "Cupid's duty! We do this once a year!"],
        choices: [
            { id: 1, text: "Ok", type: 'R', weight: 1, next: 10, followUpText: [] },
            { id: 2, text: "Sounds fun, I'm down!", type: 'A', weight: 1, next: 10, followUpText: [] },
        ]
    },


    // 9 (6)
    {
        speaker: 'bot',
        text: ["There will be 12 questions!", "Ready?"],
        choices: [
            { id: 1, text: "Alright, ask away!", type: 'O', weight: 0, next: 10, followUpText: [] },
            { id: 2, text: "I was born ready!", type: 'O', weight: 0, next: 10, followUpText: [] },
            { id: 3, text: "Let's gooo", type: 'O', weight: 0, next: 10, followUpText: [] },
        ]
    },

    // 10 (Q1)
    {
        speaker: 'bot',
        text: ["Let's start with the basics", "1) What is 'love' to you?"],
        choices: [
            { id: 1, text: "a safe space, to be ourselves and to simply be together", type: 'G', weight: 2, next: 11, followUpText: [] },
            { id: 2, text: "an adventure, filled with fun and unforgettable memories", type: 'P', weight: 2, next: 11, followUpText: [] },
            { id: 3, text: "a commitment, being there for each other no matter what", type: 'D', weight: 2, next: 11, followUpText: [] },
            { id: 4, text: "a beautiful friendship, built on trust and understanding", type: 'G', weight: 2, next: 11, followUpText: [] },
            { id: 5, text: "[insert that person's name]", type: 'D', weight: 2, next: 11, followUpText: [] },
            { id: 6, text: "a complex neurobiological process involving hormones and brain activity", type: 'P', weight: 2, next: 11, followUpText: [] },
        ]
    },

    // 11 (Q2)
    {
        speaker: 'bot',
        text: ["How...romantic", "Sooo, 2) Who do you usually have a crush on?"],
        choices: [
            { id: 1, text: "coworker / classmate", type: 'W', weight: 1, next: 12, followUpText: ["I mean, I see them everyday!"] },
            { id: 2, text: "hard to say, it's often love at first sight", type: 'B', weight: 2, next: 12, followUpText: [] },
            { id: 3, text: "Someone I've been close to for a while, like a best friend", type: 'S', weight: 2, next: 12, followUpText: [] },
            { id: 4, text: "I've never really have a crush on anyone...", type: 'W', weight: 2, next: 12, followUpText: ["unless celebrity crushes count!"] },
            { id: 5, text: "I don't have a type. I just know when it feels right", type: 'B', type2: 'S', weight: 1, next: 12, followUpText: [] },
        ]
    },


    // 12 (Q3)
    {
        speaker: 'bot',
        text: ["3) What if you have a crush right now, what's next?"],
        choices: [
            { id: 1, text: "Tell them!", type: 'B', weight: 2, next: 14, followUpText: ["I'll just message/call them and talk it out","What's the worst that could happen?"] },
            { id: 2, text: "Keep talking to them!", type: 'S', weight: 2, next: 14, followUpText: ["Consistency is the key!"] },
            { id: 3, text: "Do absolutely NOTHING", type: 'W', weight: 1, next: 13, followUpText: ["I will never ever let them know..."] },
            { id: 4, text: "Avoid them", type: 'W', weight: 2, next: 13, followUpText: ["I will run if I have to"] },
            { id: 5, text: "Make subtle moves", type: 'B', type2: 'S', weight: 1, next: 14, followUpText: ["Drops small hints, just don't make it too obvious!"] },
        ]
    },
    // 13 (Q4_3,4)
    {
        speaker: 'bot',
        text: ["lol I'd do that, too!", "While we're just sitting and waiting...", "4) What kind of dates excite you the most?"],
        choices: [
            { id: 1, text: "Chill and relaxed, where we can spend time together", type: 'G', weight: 2, next: 15, followUpText: [] },
            { id: 2, text: "Fun and spontaneous, loaded with beautiful memories", type: 'P', weight: 2, next: 16, followUpText: [] },
            { id: 3, text: "Sweet and intimate, showering each other with affections", type: 'D', weight: 2, next: 17, followUpText: [] },
        ]
    },
    // 14 (Q4_1,2,5)
    {
        speaker: 'bot',
        text: ["Aww, I love the spirit!!", "Being bold might just secure you a date!", "4) What kind of dates excite you the most?"],
        choices: [
            { id: 1, text: "Chill and relaxed, where we can spend time together", type: 'G', weight: 2, next: 15, followUpText: [] },
            { id: 2, text: "Fun and spontaneous, a lot of cute moments together!", type: 'P', weight: 2, next: 16, followUpText: [] },
            { id: 3, text: "Sweet and intimate, cherishing each other’s company", type: 'D', weight: 2, next: 17, followUpText: [] },
        ]
    },

    // 15 (Q5_1C)
    {
        speaker: 'bot',
        text: ["Going for the comfortable vibes, I see", "5) Any idea what might that be?"],
        choices: [
            { id: 1, text: "Bookstores - pick a book for each other!", type: 'R', weight: 2, next: 18, followUpText: [] },
            { id: 2, text: "Gym - friendly sports challenge to strengthen our bond", type: 'A', weight: 2, next: 18, followUpText: ["Loser gets a hug. win-win!"] },
            { id: 3, text: "Park - picnic date and some boat paddling", type: 'A', weight: 2, next: 18, followUpText: [] },
            { id: 4, text: "Home - cooking our favorite dish", type: 'R', weight: 2, next: 18, followUpText: ["A way to one's heart is through their stomach!"] },
            { id: 5, text: "Planetarium - traveling the universe while holding hands", type: 'A', type2: 'R', weight: 1, next: 18, followUpText: ["Plus, I get to geek out on the space stuffs!"] },
        ]
    },
    // 16 (Q5_2P)
    {
        speaker: 'bot',
        text: ["Exciting! you're up for some surprises, I see", "5) Any idea what might that be?"],
        choices: [
            { id: 1, text: "Aquarium - exploring sea lives while holding hands", type: 'R', weight: 2, next: 18, followUpText: [] },
            { id: 2, text: "Karaoke - singing our hearts out", type: 'A', weight: 2, next: 18, followUpText: ["My favorite tune is the sound of their heartbeat <3"] },
            { id: 3, text: "Art museum - peaceful stroll with beautiful backdrops", type: 'A', type2: 'R', weight: 1, next: 18, followUpText: ["Good way to prove that they are the most beautiful work of art"] },
            { id: 4, text: "Amusement park - ferris wheel and roller coasters, yippieee", type: 'A', weight: 2, next: 18, followUpText: [] },
            { id: 5, text: "My sofa - cuddling and watching movies", type: 'R', weight: 2, next: 18, followUpText: [] },
        ]
    },
    // 17 (Q5_2D)
    {
        speaker: 'bot',
        text: ["How romantic!", "5) Any idea what might that be?"],
        choices: [
            { id: 1, text: "Fancy Diner - candle lit and wine...perfect!", type: 'R', weight: 2, next: 18, followUpText: ["Nothing beats some good food"] },
            { id: 2, text: "Bowling alley - game on!", type: 'A', weight: 2, next: 18, followUpText: ["Loser gets a hug. win-win!"] },
            { id: 3, text: "Library - working/studying together", type: 'R', weight: 2, next: 18, followUpText: ["Stolen glances and quiet moments are magical"] },
            { id: 4, text: "Hiking trails - be one with the nature, together!", type: 'A', weight: 2, next: 18, followUpText: ["Love is an adventure, afterall"] },
            { id: 5, text: "Orchard - holding hands and picking apples", type: 'A', type2: 'R', weight: 1, next: 18, followUpText: [] },
        ]
    },

    // 18 (Q6)
    {
        speaker: "bot",
        text: ["Cuuuute", "6) Which love language matches yours the most?","These will come in handy for your date!"],
        choices: [
            { id: 1, text: "Quality time", type: 'G', weight: 2, next: 19, followUpText: [] },
            { id: 2, text: "Physical touch", type: 'P', weight: 2, next: 20, followUpText: [] },
            { id: 3, text: "Words of affirmation", type: 'G', weight: 2, next: 21, followUpText: [] },
            { id: 4, text: "Acts of service", type: 'D', weight: 2, next: 22, followUpText: [] },
            { id: 5, text: "Giving/Receiving gifts", type: 'D', weight: 2, next: 23, followUpText: [] },
            { id: 6, text: "Teasing/Playful banter", type: 'P', weight: 2, next: 24, followUpText: ["What? There are only 5 love languages?!"] },
        ]
    },
    // 19 (Q7)
    {
        speaker: "bot",
        text: ["7) What do you do during those quality time?"],
        choices: [
            { id: 1, text: "Go on a trip!", type: "B", weight: 2, next: 25, followUpText: [] },
            { id: 2, text: "Just the usual, doing something we both enjoy", type: "S", weight: 2, next: 25, followUpText: [] },
            { id: 3, text: "Cozy evening, sharing deep conversations", type: "W", weight: 2, next: 25, followUpText: [] },
        ]
    },
    // 20 (Q7)
    {
        speaker: "bot",
        text: ["7) For example...?"],
        choices: [
            { id: 1, text: "Spontaneous hugs and kisses", type: "B", weight: 2, next: 25, followUpText: [] },
            { id: 2, text: "Cuddling and holding hands", type: "S", weight: 2, next: 25, followUpText: [] },
            { id: 3, text: "Gentle head pats and eyes contacts", type: "W", weight: 2, next: 25, followUpText: [] }
        ]
    },
    // 21 (Q7)
    {
        speaker: "bot",
        text: ["7) For example...?"],
        choices: [
            { id: 1, text: "Showers with compliments until they're a puddle", type: "B", weight: 2, next: 25, followUpText: [] },
            { id: 2, text: "Assure them that I’ll always be by their side", type: "S", weight: 2, next: 25, followUpText: [] },
            { id: 3, text: "Remind them how much I appreciate them", type: "W", weight: 2, next: 25, followUpText: [] },
        ]
    },
    /*{
        speaker: "bot",
        text: ["7) For example...?"],
        choices: [
            { id: 1, text: "Have I mentioned how amazing you are? Well, I’m saying it again", type: "B", weight: 2, next: 25, followUpText: [] },
            { id: 2, text: "I’ve got your back, always", type: "S", weight: 2, next: 25, followUpText: [] },
            { id: 3, text: "I'm lucky to have you. I trust you more than anyone", type: "W", weight: 2, next: 25, followUpText: [] },
        ]
    },*/

    // 22 (Q7)
    {
        speaker: "bot",
        text: ["7) What act? What service?!"],
        choices: [
            { id: 1, text: "Anything and everything for them, they don't even have to ask", type: "B", weight: 2, next: 25, followUpText: [] },
            { id: 2, text: "Taking care of small things, like chores, every day", type: "S", weight: 2, next: 25, followUpText: [] },
            { id: 3, text: "Anything they need, just name it", type: "W", weight: 2, next: 25, followUpText: [] },
        ]
    },
    // 23 (Q7)
    {
        speaker: "bot",
        text: ["7) What kind of gifts would you give?"],
        choices: [
            { id: 1, text: "Unique and extravagant", type: "B", weight: 2, next: 25, followUpText: ["I’ll get them anything they want—it’s theirs once they set their eyes on it"] },
            { id: 2, text: "Practical and meaningful", type: "S", weight: 2, next: 25, followUpText: ["I pay close attention to what they actually need","It'd be something that reminds me of them"] },
            { id: 3, text: "Personalized and thoughtful", type: "W", weight: 2, next: 25, followUpText: ["Something custom-made—like a one-of-a-kind gift, just for them"] },
        ]
    },
    // 24 (Q7)
    {
        speaker: "bot",
        text: ["You just invented the 6th love langauge!", "7) Care to elaborate?"],
        choices: [
            { id: 1, text: "I just can’t resist, they’re too cute when I make them pout!", type: "B", weight: 2, next: 25, followUpText: [] },
            { id: 2, text: "I’m all for a little sass, as long as it’s fun for both of us", type: "S", weight: 2, next: 25, followUpText: [] },
            { id: 3, text: "I’m in for some fun pranks, but always make sure they’re comfortable with it", type: "W", weight: 2, next: 25, followUpText: [] },
        ]
    },

    // 25 (Q8)
    {
        speaker: "bot",
        text: ["Is that so? I'm learning a lot about you already!", "8) What's the vibes of your go-to outfit for a date?"],
        choices: [
            { id: 1, text: "Classy and timeless", type: "D", weight: 2, next: 26, followUpText: [] },
            { id: 2, text: "Stylish and cool", type: "P", weight: 1, next: 26, followUpText: [] },
            { id: 3, text: "Simple and comfortable", type: "G", weight: 2, next: 26, followUpText: [] },
            { id: 4, text: "Anything and my crocs", type: "P", weight: 2, next: 26, followUpText: [] },
            { id: 4, text: "Something I rock with confidence", type: "G", type2: "D", weight: 1, next: 26, followUpText: [] },
            
        ]
    },

    // 26 (Q9)
    {
        speaker: "bot",
        text: ["9) What's one item you would definitely bring on a date?"],
        choices: [
            { id: 1, text: "a flower bouquet", type: "B", weight: 2, next: 27, followUpText: [] },
            { id: 2, text: "my wallet", type: "S", weight: 2, next: 27, followUpText: [] },
            { id: 3, text: "my *whole* backpack", type: "W", weight: 2, next: 27, followUpText: ["I got wet wipes, gum, band-aid...","just in case they need it too!"] },
            { id: 4, text: "an umbrella", type: "W", weight: 2, next: 27, followUpText: ["big enough to fit both of us in case it rains"] },
            { id: 5, text: "a camera", type: "B", weight: 2, next: 27, followUpText: ["to capture our memories"] },
            { id: 6, text: "a small gift", type: "S", weight: 2, next: 27, followUpText:  ["like a plushie or matching key chains"] },
        ]
    },


    // 27 (Q10)
    {
        speaker: "bot",
        text: ["Wise choice! Now, enough with your (hypothetical) love scenarios", "Let's get to know YOU more!", "10) Who are you in a friend group?"],
        choices: [
            { id: 1, text: "The taken one", type: "D", type2: "A", weight: 2, next: 28, followUpText: [] },
            { id: 2, text: "The quiet/mysterious one", type: "G", type2: "R", weight: 2, next: 31, followUpText: [] },
            { id: 3, text: "The one who plans all the hangouts", type: "P", type2: "A", weight: 2, next: 30, followUpText: [] },
            { id: 4, text: "The shipper/matchmaker", type: "P", type2: "R", weight: 2, next: 29, followUpText: [] },
            { id: 5, text: "The single but love guru", type: "G", type2: "A", weight: 2, next: 29, followUpText: ["Coaches don’t play ;)"] },
            { id: 6, text: "Bold of you to assume I have friends", type: "D", type2: "R", weight: 2, next: 32, followUpText: [] },
        ]
    },

    // 28 (Q11_)
    {
        speaker: 'bot',
        text: ["Ooooh taken, I see", "11) Any words of advices on relationship?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moment in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 29 (Q11_2,3)
    {
        speaker: 'bot',
        text: ["Ooooh, looks like someone's playing Cupid!", "11) Any wisdom to share, love expert?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moment in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 30 (Q11_3,4)
    {
        speaker: 'bot',
        text: ["Okayy, I bet you're cool","Now, let's say you meet your past self","11) What love advice would you give them?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moment in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 31 (Q11...)
    {
        speaker: 'bot',
        text: ["The cool one, I see","Now, let's say you meet your past self","11) What love advice would you give them?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moment in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 32 (Q11...)
    {
        speaker: 'bot',
        text: ["Of course you have friends! Count me in!", "And hey, you are your own best friend—ever heard that saying?", "Now, let's say you meet your past self...", "11) What love advice would you give them?"],
        choices: [
            { id: 1, text: "Never settle for less. You know what's best for yourself", type: 'B', weight: 2, next: 33, followUpText: [] },
            { id: 2, text: "Put in the effort, strive to make your loved one happy", type: 'W', weight: 2, next: 33, followUpText: [] },
            { id: 3, text: "Make every day feel special, cherish every moment in life", type: 'S', weight: 2, next: 33, followUpText: [] },
        ]
    },

    // 33 (Q12)
    {
        speaker: 'bot',
        text: ["Down to the last question, then","12) Anything you'd like to wish for?"],
        choices: [
            { id: 1, text: "For A LOT OF Chocolate!!", type: 'P',weight: 2, next: 34, followUpText: [] },
            { id: 2, text: "Send me some looove", type: 'G',weight: 2, next: 34, followUpText: [] },
            { id: 3, text: "For my crush to like me back", type: 'D',weight: 2, next: 34, followUpText: [] },
            { id: 4, text: "For a Happy Valentine's Day", type: 'P',weight: 2, next: 34, followUpText: [] },
            { id: 5, text: "For a restful weekend", type: 'D',type2:'G',weight: 2, next: 34, followUpText: [] },
        ]
    },

    // 34
    {
        speaker: 'bot',
        text: ["Noted, that shall be served","oh, Just curious, what's your plan today?","Apart from playing this silly quiz, of course"],
        choices: [
            { id: 1, text: "Eat a lot of chocolate!!!", type: 'R',weight: 2, next: 35, followUpText: [] },
            { id: 2, text: "gonna go out and have funn!", type: 'A',weight: 1, next: 35, followUpText: [] },
            { id: 3, text: "I need to work/study T^T", type: 'R',weight: 1, next: 35, followUpText: [] },
            { id: 4, text: "Duh, I have a date!", type: 'A',weight: 1, next: 35, followUpText: [] },
            { id: 5, text: "No plans, just chilling at home", type: 'R',weight: 1, next: 35, followUpText: [] },
        ]
    },
    

    // 35 last
    {
        speaker: 'bot',
        text: ["lololl have fun!","Ready to see your result?"],
        choices: [
            { id: 1, text: 'YES!', type: 'O', weight: 0, next: 100, followUpText: [] },
        ]
    },

];


function addMessage(speaker, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', speaker);
    messageElement.textContent = text;
    document.getElementById('chatbox').appendChild(messageElement);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;


    /*if (isLink) {
        const link = document.createElement('a');
        link.innerText = text;
        link.onclick = displayResult;
        messageElement.appendChild(link);
    }
    else if (opt) {
        const link = document.createElement('a');
        link.innerText = text;
        link.href = "https://www.instagram.com/izonfalzo/?hl=en";
        link.target = "_blank";
        messageElement.appendChild(link);
    }else {
        messageElement.textContent = text;
    }*/
}

function showChoices(choices) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    choices.forEach(choice => {
        const choiceButton = document.createElement('button');
        choiceButton.classList.add('choice-button');
        choiceButton.textContent = choice.text;
        choiceButton.onclick = () => handleChoice(choice.type, choice.type2, choice.type3, choice.weight, choice.id, choice.next);
        choicesContainer.appendChild(choiceButton);
    });
}

let typingInterval;
let typingDots = 0;

function showTypingDots() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'typing...';
    document.getElementById('chatbox').appendChild(typingIndicator);
    typingIndicator.style.display = 'inline';

    typingDots = 0;

    typingInterval = setInterval(() => {
        typingIndicator.textContent = '.'.repeat(typingDots % 5);
        typingDots++;
    }, 250);
}

function stopTypingDots() {
    clearInterval(typingInterval);
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function displayResult() {
    let resultType = '';
    // B, S, or W
    let topBSW = [];
    if (scores.B >= scores.S && scores.B >= scores.W) topBSW.push('B');
    if (scores.S >= scores.B && scores.S >= scores.W) topBSW.push('S');
    if (scores.W >= scores.B && scores.W >= scores.S) topBSW.push('W');
    resultType += topBSW[Math.floor(Math.random() * topBSW.length)];

    // C, P, or D
    let topGPD = [];
    if (scores.G >= scores.P && scores.G >= scores.D) topGPD.push('G');
    if (scores.P >= scores.G && scores.P >= scores.D) topGPD.push('P');
    if (scores.D >= scores.G && scores.D >= scores.P) topGPD.push('D');
    resultType += topGPD[Math.floor(Math.random() * topGPD.length)];

    // A or R
    let topAR = [];
    if (scores.A >= scores.R) topAR.push('A');
    if (scores.R >= scores.A) topAR.push('R');
    resultType += topAR[Math.floor(Math.random() * topAR.length)];


    const resultsText = {
        'BGA': 'Raccoon',
        'BGR': 'Black Cat',
        'BDA': 'Doberman',
        'BDR': 'Lion',
        'BPA': 'Golden Retriever',
        'BPR': 'Fox',
        'SGA': 'Hamster',
        'SGR': 'Capybara',
        'SDA': 'Duck',
        'SDR': 'Sheep',
        'SPA': 'Orange Cat',
        'SPR': 'Chihuahua',
        'WGA': 'Bird',
        'WGR': 'Deer',
        'WDA': 'Snow Leopard',
        'WDR': 'Hedgehog',
        'WPA': 'Bunny',
        'WPR': 'Red Panda'
    }

    const resultImages = {
        'BGA': '1.png',
        'BGR': '2.png',
        'BDA': '3.png',
        'BDR': '4.png',
        'BPA': '5.png',
        'BPR': '6.png',
        'SGA': '7.png',
        'SGR': '8.png',
        'SDA': '9.png',
        'SDR': '10.png',
        'SPA': '11.png',
        'SPR': '12.png',
        'WGA': '13.png',
        'WGR': '14.png',
        'WDA': '15.png',
        'WDR': '16.png',
        'WPA': '17.png',
        'WPR': '18.png',
    };
    //document.getElementById('result-text').textContent = resultType + ' ' + resultsText[resultType];
    /*document.getElementById('result-image').src = resultImages[resultType];
    document.getElementById('result-overlay').style.display = 'flex';*/
    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("result-page").style.display = "flex";
    document.getElementById("result-image").src = "IMG/" + resultImages[resultType];
    document.getElementById("result-image").alt = resultType + resultsText[resultType];
}

/*function closeResult() {
    document.getElementById('result-overlay').style.display = 'none';
    setTimeout(() => {
        addMessage('bot', 'Would you like to play again?');
        showChoices([
            { text: 'Yes, let’s go!', type: 'restart' },
            { text: 'No, thanks.', type: 'exit' }
        ]);
    }, 500);
}*/

function handleChoice(type, type2, type3, weight, id, nextIndex) {
    const dingSound = document.getElementById('dingSound');
    dingSound.play();
    const chosenOption = dialogue[currentMessageIndex].choices.find(choice => choice.type === type && choice.id === id);
    scores[type] += weight;
    scores[type2] += weight;
    scores[type3] += weight;



    updateDebugScores();
    currentMessageIndex = nextIndex;
    document.getElementById('choices').innerHTML = '';
    addMessage('user', chosenOption.text, false);

    if (chosenOption.followUpText && chosenOption.followUpText.length > 0) {
        chosenOption.followUpText.forEach((followUp, index) => {
            setTimeout(() => {
                addMessage('user', followUp);
            }, (index + 1) * 1000);
        });
    }

    setTimeout(() => {
        showTypingDots();

        setTimeout(() => {
            stopTypingDots();
            const popSound = document.getElementById('popSound');
            popSound.play();
            if (currentMessageIndex == 0 || currentMessageIndex == 2 || currentMessageIndex >=3 ) {
                const header = document.getElementById("header");
                header.textContent = 'Unknown';
                header.style.color = 'var(--6-color)';
                header.style.backgroundColor = 'var(--2-color)';
                const phoneScreen = document.getElementById("phone-screen");
                phoneScreen.style.backgroundColor = '#fff';
            }

            if (currentMessageIndex >= 6) {
                const header = document.getElementById("header");
                header.textContent = 'Cupid';
                header.style.color = 'var(--6-color)';
            }

            if (currentMessageIndex < dialogue.length) {
                const currentDialogue = dialogue[currentMessageIndex];
                currentDialogue.text.forEach((text, index) => {
                    setTimeout(() => {
                        addMessage(currentDialogue.speaker, text);
                    }, index * 1000);
                });
                setTimeout(() => {
                    showChoices(currentDialogue.choices);
                }, currentDialogue.text.length * 1000);

            }
            else {
                triggerIconShower();
                displayResult();
            }

        }, 1500);
    }, (chosenOption.followUpText.length * 1000) + 500);
}
//}


function restartQuiz() {
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "flex";
    currentMessageIndex = 0;
    scores.B = scores.S = scores.W = scores.G = scores.P = scores.D = scores.A = scores.R = 0;
    document.getElementById('chatbox').innerHTML = '';
    document.getElementById('choices').innerHTML = '';
    const header = document.getElementById("header");
    header.textContent = '02/14';
    header.style.color = '#fff';
    header.style.backgroundColor = 'rgb(22, 22, 22)';
    const phoneScreen = document.getElementById("phone-screen");
    phoneScreen.style.backgroundColor = 'rgb(22, 22, 22)';
    startConversation();
}

function startConversation() {

    addMessage('bot', dialogue[0].text);
    showChoices(dialogue[0].choices);

}

function updateDebugScores() {
    const debugScoresElement = document.getElementById('debug-scores');
    const formattedScores = `
    ${currentMessageIndex+1}
B: ${scores.B}, S: ${scores.S}, W: ${scores.W},
G: ${scores.G}, P: ${scores.P}, D: ${scores.D}, 
A: ${scores.A}, R: ${scores.R}`;
    debugScoresElement.textContent = formattedScores.trim();
}




function share() {
    const link = window.location.href;
    
    navigator.clipboard.writeText(link)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            alert('Failed to copy the link: ' + err);
        });

    html2canvas(document.body).then(canvas => {
        const screenshot = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshot;
        downloadLink.download = 'myresult.png';
        downloadLink.click();
    });
}



function triggerIconShower(event) {
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.classList.add('icon');

        const iconContent = Math.random() > 0.5 ? '♥' : '★';
        icon.textContent = iconContent;


        if (iconContent === '♥') {
            icon.classList.add('heart');
        }
        else {
            icon.classList.add('star');
        }


        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;


        document.body.appendChild(icon);


        setTimeout(() => {
            icon.remove();
        }, 3000);
    }
}

startConversation();




