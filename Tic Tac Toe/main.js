var gms = new GameManager(); //GameManager클래스 객체를 생성, gms에 저장함.

var user1 = new Vue({ //Vue 객체 생성
    el : ".start_game-user1", //index.html의 div태그의 속성인 class="game-user1"요소를 가져온다.
    data: gms, //class="game-user1"요소에 담길 데이터는 gms다.
    computed : { //computed 속성은 index.html에 있는 콧수염 괄호에 들어가는 데이터를 변화시킬 수 있는 속성이다.
        p1 : function () { //{{ p1 }}에 들어갈 값을 지정하는 함수
            return this.name_1; //this.name_1의 값을 리턴함
        },

        win_1p: function () { //{{ win_1p }}에 들어갈 값을 지정하는 함수
          return  this.win_1; //this.win_1의 값을 리턴함
        },

        lose_1p: function () { //{{ lose_1p }}에 들어갈 값을 지정하는 함수
            return this.lose_1; //this.lose_1의 값을 리턴함
        }
    }
});

var user2 = new Vue({ //Vue 객체 생성
    el : ".start_game-user2", //index.html의 div태그의 속성인 class="game-user2"요소를 가져온다.
    data: gms, //class="game-user2"요소에 담길 데이터는 gms다
    computed : { //computed 속성은 index.html에 있는 콧수염 괄호에 들어가는 데이터를 변화시킬 수 있는 속성이다.
        p2: function () { //{{ p2 }}에 들어갈 값을 지정하는 함수
            return this.name_2; //this.name_2의 값을 리턴함
        },

        win_2p: function () { //{{ win_2p }}에 들어갈 값을 지정하는 함수
            return this.lose_1; //this.win_1의 값을 리턴함
        },

        lose_2p: function () { //{{ lose_1p }}에 들어갈 값을 지정하는 함수
            return this.win_1; //this.lose_1의 값을 리턴함
        }
    }
});

var win_person = new Vue({
    el:".wrap",
    data: gms,
    computed: {
        p1 : function () { //{{ p1 }}에 들어갈 값을 지정하는 함수
            return this.name_1; //this.name_1의 값을 리턴함
        },

        win_1p: function () { //{{ win_1p }}에 들어갈 값을 지정하는 함수
          return  this.win_1; //this.win_1의 값을 리턴함
        },

        lose_1p: function () { //{{ lose_1p }}에 들어갈 값을 지정하는 함수
            return this.lose_1; //this.lose_1의 값을 리턴함
        },

        p1_turn: function(){
            return this.pattern_O;
        },

        p2: function () { //{{ p2 }}에 들어갈 값을 지정하는 함수
            return this.name_2; //this.name_2의 값을 리턴함
        },

        win_2p: function () { //{{ win_2p }}에 들어갈 값을 지정하는 함수
            return this.lose_1; //this.win_1의 값을 리턴함
        },

        lose_2p: function () { //{{ lose_1p }}에 들어갈 값을 지정하는 함수
            return this.win_1; //this.lose_1의 값을 리턴함
        },

        p2_turn: function(){
            return this.pattern_X;
        },

        getmessage: function(){ //{{ getmessage }}에 들어갈 값을 지정하는 함수
            if(this.start == true){ //게임 시작 버튼을 눌렀다면
                if (this.inProgress){ //만약에 게임이 진행중이라면
                    return this.currentTurn + "님의 턴입니다."; //현재 턴인 사람의 이름과 함께 안내문을 리턴함.
                }
    
                if(this.winner){ //만약에 winner에 값이 들어갔다면
                    return this.winner + '님 승리입니다.'; //이긴 사람의 이름과 함께 안내문을 리턴함.
                }
                
                if(!this.winner && !this.inProgress){ //만약에 이긴 사람도 없고 게임의 진행도 멈췄다면
                    return '비겼습니다'; //비겼다는 안내문 리턴
                }
            } else { //게임 시작 버튼을 누르지 않았다면
                return "게임시작 버튼을 눌러 게임을 시작해주십시오." //안내문 리턴
            }
        },

        win: function(){
            if(this.winner){
                if(this.start == false){
                    return "게임시작 버튼을 눌러주세요";
                }
                return this.winner + "님 승리입니다";
            }
        }
    },

    methods : {
        oxinput : function(event){
            gms.input([].indexOf.call(event.target.parentElement.children, event.target));
        },

        oinput : (i) => {
            gms.input(i);
        }
    }
    
});