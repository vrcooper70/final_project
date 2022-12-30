const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};


function startGame() {
  state = {};
  showTextNode(1);
  

};

function showTextNode(textNodeIndex) {
   const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
   textElement.innerText = textNode.text;
   while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
   
   }
   textNode.options.forEach(option => {
    if (showOption(option)) {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectOption(option));
        optionButtonsElement.appendChild(button);
        
        // experimental code for button fade in

        const buttonTimeLine = gsap.timeline({ defaults: {duration: 7}});
        buttonTimeLine
        .fromTo('.btn', {opacity: 0}, {opacity: 1});

        // Experimental code to animate id text

            let intro = document.getElementById('text');
            let introText = intro.textContent;
            let splitText = introText.split("");
            text.textContent = "";
            
            
            let i = 0;
            let txt = introText;
            let speed = 50;
            
            function typeWriter() {
                if (i < txt.length) {
                    document.getElementById("text").innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                    }
                }

            setTimeout(typeWriter, 1500);

    }
   })
    
};

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
};

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if(nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
};

const textNodes = [
    {
        id: 1,
        text: `You see Benny Bunny being swept away by a tornado!`,
        options: [
            {
                text: `You follow the tornado to the South.`,
                setState: { followTornado: true },
                nextText: 2,
            },
            {
                text: `You run to your basement and hide.`,
                nextText: 7,
            },
        ]
    },
    {   
        id: 2,
        text: `You venture forth to the South in search of Benny Bunny where you 
        encounter a wizard.`,
        options: [
            {
                text: `You ask the wizard for the golden wand and he gives it to you.`,
                requiredState: (currentState) => currentState.followTornado,
                setState: { followTornado: false, golden_wand: true },
                nextText: 3,
            },
            {
                text: `You ask the wizard for the map and he gives it to you.`,
                requiredState: (currentState) => currentState.followTornado,
                setState: { followTornado: false, map: true },
                nextText: 3,
            },
            {
                text: `Ignore the wizard.`,
                nextText: 3,
            },
        ]
        },
    
        {   
            id: 3,
            text: `After leaving the wizard you are very tired and stumble upon a barn.`,
            options: [
                {
                    text: `Explore the barn.`,
                    nextText: 4,
                },
                {
                    text: `Go to the farmhouse nearby to find a bed.`,
                    nextText: 5,
                },
                {
                    text: `Find hay in a stable to sleep in.`,
                    nextText: 6,
                },
                
            ]
            },

            {
                id: 4,
                text: `You are so tired that you fall asleep while exploring the barn
                and are killed by a rabid cow in your sleep.`,
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    }
                    
                ]
            },
            {
                id: 5,
                text: `You sneak into the farmhouse and eat some chocolate cookies and drink milk. You are caught by the owner who then calls the police.
                You are sent to prison.`,
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    }
                    
                ]
            },
            {
                id: 6,
                text: `You wake up very well rested and are ready to continue your search for Benny Bunny.`,
                options: [
                    {
                        text: 'Continue journey',
                        nextText: -1, // this line will be changed as the narrative grows
                    }
                    
                ]
            },
            {
                id: 7,
                text: `No worries. Someone else will save Benny Bunny!`,
                options: [
                    {
                        text: 'Restart',
                        nextText: -1,
                    }
                    
                ]
            },
    
];

startGame();

//Animate Game Title

let myContainer = document.querySelector(".header1");

let speeds = {
    pause: 500,
    slow: 120,
    normal: 70,
    fast: 40.
}
let textLines = [
  { string: "Save", speed: speeds.normal },
  { string: "Benny Bunny", speed: speeds.normal, classes:['white'] },
  { string: "Now!", speed: speeds.normal},

]

let characters = [];
textLines.forEach((line, index) => {

if(index < textLines.length - 1)  {
    line.string += " "; // adds a space between lines
}

    line.string.split("").forEach(character => {
        let span = document.createElement("span");
        span.textContent = character;
        myContainer.appendChild(span);
        characters.push({
            span: span,
            isSpace: character === " ",
            delayAfter: line.speed,
            classes: line.classes || []

        })
    })
});

function revealOneCharacter(list) {
    let next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");
    next.classes.forEach((c) => {
        next.span.classList.add(c);
    });

    let delay = next.isSpace ? 0 : next.delayAfter;

    if(list.length > 0) {
        setTimeout(function() {
            revealOneCharacter(list);
        }, delay)
    }
}

revealOneCharacter(characters);

// Experimental bunny animation

const timeline = gsap.timeline({ defaults: { duration: 1}})
timeline
    .fromTo('#bunny', { opacity: 0, scale: 0, rotation: 720 }, {opacity: 1, scale: 1, rotation: 0});

    const bunny = document.querySelector('#bunny') 

    bunny.addEventListener('click', () => {
        timeline.timeScale(3);
        timeline.reverse();
    });


    // Experimental code for sound effects


    let music = {
        overworld: new Howl({

            src: [
                "/Save-Benny-Bunny.mp3",
                
            ],
        })   
        
    };

   //sfx.play();

   // start music
   document.querySelector('.play-music').addEventListener('click', function() {
      if(!music.overworld.playing()) {
        music.overworld.play();
      }
   
   })

   // pause music
   document.querySelector('.stop-music').addEventListener('click', function() {
   
      music.overworld.pause();

 
 });










