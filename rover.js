class Rover {
   constructor(position) {
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
     this.position = position;
   }

   receiveMessage(message) {
     let res = [];

     for(let i = 0; i < message.commands.length; i++) {
       let command = message.commands[i];
       let commandResult = {
         completed: false
       };
       switch(command.commandType) {
        case 'MOVE':
        if (this.mode !== 'LOW_POWER') {
          this.position = command.value;
          commandResult.completed = true;
        }
        break;
        case 'STATUS_CHECK':
        commandResult.roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        };
        commandResult.completed = true;
        break;
        case 'MODE_CHANGE':
        this.mode = command.value;
        commandResult.completed = true;
        break;
       }
       res.push(commandResult);
     }

     let response = {
       message: message.name,
       results: res
     };

     //console.log(response);
     
     return response;
   }
}

module.exports = Rover;