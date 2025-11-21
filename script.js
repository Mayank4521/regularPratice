const users = [
  {
    fullName: "Aarav Mehta",
    profession: "Software Developer",
    image: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    description: "A passionate full-stack developer who loves building scalable apps and experimenting with new technologies.",
    tags: ["JavaScript", "React", "Node.js", "Full Stack"]
  },
  {
    fullName: "Sara Kapoor",
    profession: "Digital Artist",
    image: "https://images.unsplash.com/photo-1615109398623-88346a601842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww",
    description: "Creates surreal and vibrant digital artworks using a fusion of 3D design and hand-drawn elements.",
    tags: ["Art", "Illustration", "3D", "Design"]
  },
  {
    fullName: "Rahul Verma",
    profession: "Fitness Coach",
    image: "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Certified fitness trainer focusing on strength training, mobility, and balanced diet strategies.",
    tags: ["Fitness", "Workout", "Health", "Strength"]
  },
  {
    fullName: "Ishita Sharma",
    profession: "Travel Photographer",
    image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Captures nature, landscapes, and cultural moments while traveling across the world.",
    tags: ["Photography", "Travel", "Nature", "Adventure"]
  },
  {
    fullName: "Kabir Singh",
    profession: "UX/UI Designer",
    image: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Designs clean, user-friendly interfaces with a strong focus on accessibility and user experience.",
    tags: ["UI/UX", "Design", "Prototyping", "Figma"]
  }
];

let sum = ''

users.forEach(function(elem){
    
    sum = sum + `<div class="card">
            <img src="${elem.image}" alt="">
            <h3>${elem.fullName}</h3>
            <h4>${elem.profession}</h4>
            <p>${elem.description}</p>
        </div>`
})
console.log(sum)

var main = document.querySelector("main")

main.innerHTML = sum