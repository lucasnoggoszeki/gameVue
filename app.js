function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + max;
}

const app = Vue.createApp({
  data(){
    return {
      playerSaude: 100,
      mosnterSaude: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    }
  },
  computed: {
    monsterBarStyle(){
      if(this.mosnterSaude < 0){
        return { width: '0%'};
      }
      return {width: this.mosnterSaude + '%'};
    },
    playerBarStyle(){
      if(this.playerSaude < 0){
        return {with: '0%'}
      }
      return {width: this.playerSaude + '%'};
    },
    mayUseSpecialAttack(){
      return this.currentRound % 3 !== 0
    }
  },
  watch: {
    playerSaude(value){
      if(value <= 0 && this.mosnterSaude <= 0){
        this.winner = 'draw'
      } else if (value <=0) {
        this.winner = 'monster'
      }
    },
    mosnterSaude(value){
      if(value <= 0 && this.playerSaude <= 0){
        this.winner = 'draw'
      } else if (value <=0) {
        this.winner = 'player'
      }
    }
  },
  methods: {
    attackMonster(){
      this.currentRound++;
      const attackValue = getRandomValue(5,12);
      this.mosnterSaude -= attackValue;
      this.addLogMessage('player', 'attack', attackValue)
      this.attackPlayer();
    },
    attackPlayer(){
      const attackValue = getRandomValue(8,15);
      this.playerSaude -= attackValue;
      this.addLogMessage('monster', 'attack', attackValue)
    },
    specialAttackMonster(){
      this.currentRound++;
      const specialAttackValue = getRandomValue(10,25);
      this.mosnterSaude -= specialAttackValue;
      this.addLogMessage('player', 'specialAttack', specialAttackValue)
      this.attackPlayer();
    },
    healPlayer(){
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if(this.playerSaude + healValue > 100){
        this.playerSaude = 100
      } else {
        this.playerSaude += healValue;
      }
      this.addLogMessage('player', 'heal', healValue)
      this.attackPlayer();
    },
    startGame(){
      this.playerSaude = 100;
      this.mosnterSaude = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages= []
    },
    surrender(){
      this.winner = 'monster';
    },
    addLogMessage(who, what, value){
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    }
  }
});

app.mount('#game');