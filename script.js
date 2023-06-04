function solve() {
    const fileInput = document.getElementById('inputFile'); 
    const file = fileInput.files[0]; 
    const reader = new FileReader();// Create a new `FileReader` object to read the contents of the file.

   
    reader.onload = function(e) { 
      const input = e.target.result.trim().split('\n'); //Get the contents of the file as a string using `e.target.result`, remove any leading or trailing whitespace using `trim()`, and split the string into an array of lines using `split('\n')`.
      const t = parseInt(input[0]); //- Parse the first line of the input as an integer `t`, which represents the number of test cases.
      let output = ''; //Initialize a string `output` to store the output for each test case.
  
      for (let i = 1; i <= t; i++) {
        const [r, c] = input[i].split(' ').map(Number); //Parse the `i`-th line of the input as two integers `r` and `c`, which represent the length of the race and the number of cars, respectively
        const cars = [];
  
        
        for (let j = 1; j <= c; j++) { 
          const [cid, cs, ct, cc, cd] = input[i+j].split(' ').map(Number);
          cars.push({id: cid, speed: cs, turbo: ct, cooldown: cc, duration: cd});
        }
  //- Loop through each car in the `cars` array and calculate its time to complete the race, the number of turbo boosts it can perform, and its initial distance, based on the car's speed, turbo speed, turbo cooldown, and turbo duration, as described in the problem statement
        for (let j = 0; j < c; j++) {
          const car = cars[j];
          car.time = r / car.speed;
          car.boosts = Math.floor(car.cooldown / car.duration) + 1;
          car.distance = 0;
        }
  

        //- Loop through each car in the `cars` array and calculate its time to complete the race, the number of turbo boosts it can perform, and its initial distance, based on the car's speed, turbo speed, turbo cooldown, and turbo duration, as described in the problem statement
        for (let sec = 0; sec < r; sec++) {
          for (let j = 0; j < c; j++) {
            const car = cars[j];
            if (car.boosts > 0) {
              car.distance += car.turbo;
              car.boosts--;
            } else {
              car.distance += car.speed;
            }
          }
        }
  //- Sort the `cars` array by their distance in descending order and their identifier in ascending order, and select the first, second, and third winner.
        const winners = cars.sort((a, b) => b.distance - a.distance || a.id - b.id).slice(0, 3);

  

  output += `Case #${i}: ${winners[0].id} ${winners[1].id} ${winners[2].id}\n`;
        
      }
      

      document.getElementById('output').textContent = output;
    };
  
    reader.readAsText(file);
  }
  




  