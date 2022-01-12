class GameManager{ //틱택토 기능들과 규칙들을 모아둔 클래스
    constructor()
    {
        this.maps = new Array(9).fill().map(s => new maptile());
        //3x3의 칸을 생성함
        this.inProgress = false; //게임의 진행 여부
        this.winner = null; //게임에서 이긴 사람
        this.movesMode = 0; //O,X를 그린 횟수
        this.name_1 = null; //p1의 이름
        this.win_1= 0; //p1의 승리기록 = p2의 패배기록
        this.lose_1 = 0; //p1의 패배기록 = p2의 승리기록
        this.name_2 = null; //p2의 이름
        this.start = false; //게임 시작 버튼을 눌렀는지의 여부, this로 쓴 이유는 main.js에서도 이 start를 사용하기 때문이다.
        this.currentTurn = null; //현재 턴
        this.pattern_O = "O"; //maps에 표시할 O패턴
        this.pattern_X = "X"; //maps에 표시할 X패턴
    }

    Start(){ //게임 시작 버튼을 눌렀을 때, 게임을 시작시키는 함수
        this.start = true; //게임 시작 버튼을 눌렀다는 것을 판별함

        if(this.inProgress && !this.maps.value){ //게임이 진행중이면서 maps의 값이 null이 아니라면
            alert("게임이 진행중입니다."); //게임이 진행중입니다. 라는 알람을 띄운다.
        } else { //만약 그런 상황이 아니라면 게임을 시작한다.
            this.name_1 = prompt("p1의 이름을 입력해주세요.");
            //p1의 이름을 prompt함수로 입력받아서 name_1에 저장함
            this.name_2 = prompt("p2의 이름을 입력해주세요.");
            //p2의 이름을 prompt함수로 입력받아서 name_2에 저장함

            if(!this.name_1 && !this.name_2){ //만약에 name_1이랑 name_2가 null값이라면
                this.name_1 = "player1"; //name_1에 "player1" 값을 넣는다. = 디폴트 이름
                this.name_2 = "player2"; //name_2에 "player2" 값을 넣는다. = 디폴트 이름
            } else if(this.name_1 == this.name_2){ //만약에 name_1이랑 name_2의 이름이 같다면
                this.name_2 = this.name_2+"(2)"; //name_2에 "(2)"를 넣어서 구별해준다.
            }
        }

        this.currentTurn = this.name_1;
        //현재턴은 this.name_1이다. 즉, name_1부터 시작함.

        if(this.start == false){ //만약에 게임이 시작되지 않았다면
            alert("아직 시작하지 않았습니다."); //"아직 시작하지 않았습니다"라는 알림창을 띄운다.
            this.inProgress = false; //게임 진행을 멈춘다.
        }

        this.inProgress = true; //게임이 진행됨
        this.currentTurn = this.name_1; //현재 턴이 name_1로 시작한다.
        this.movesMode = 0; //턴이 넘어간 횟수를 0으로 초기화한다.
        this.maps = new Array(9).fill().map( s => new maptile() ); //3x3의 칸을 다시 만든다.
        this.winner = null; //이긴 사람을 초기화 시켜준다.

        if(this.start == false){ //만약에 게임이 시작되지 않았다면
            alert("아직 시작하지 않았습니다."); //"아직 시작하지 않았습니다"라는 알림창을 띄운다.
            this.inProgress = false; //게임 진행을 멈춘다.
        }
        this.winner = null; //이긴 사람을 초기화 시켜준다.
        boom.play();
    }

    input(i){ //maps에 O,X 표시하기, 매개변수 i는 내가 맵의 칸을 클릭한 횟수이다.
        if(this.inProgress && !this.maps[i].value) { //게임 진행중이고 maps[i]의 값이 null이 아닐 때
            this.movesMode++; //턴이 넘어갈 때마다 증가
            if(this.currentTurn === this.name_1){ //현재 턴이 name_1이랑 같으면
                this.maps[i].value = this.pattern_O; //maps[i]의 값에 O를 저장한다.
                o.currentTime = 0;
                o.play();
                this.currentTurn = this.name_2; //현재 턴이 name_2. 즉, p2에게 턴이 넘어간다.
            } else { //현재 턴이 name_1외에 다른 이름이면
                this.maps[i].value = this.pattern_X; //maps[i]의 값에 X를 저장한다.
                x.currentTime = 0;
                x.play();
                this.currentTurn = this.name_1; //현재 턴이 name_1. 즉, p1에게 턴이 넘어간다.
            }

            this.checkForWinner(); //checkForWinner함수 호출
        }
    }

    Init(){ //초기화 변수(다시 시작버튼을 누르면 실행됨)
        this.inProgress = true; //게임이 진행된다.
        this.currentTurn = this.name_1; //현재 턴이 name_1로 시작한다.
        this.movesMode = 0; //턴이 넘어간 횟수를 0으로 초기화한다.
        this.maps = new Array(9).fill().map( s => new maptile() ); //3x3의 칸을 다시 만든다.
        this.winner = null; //이긴 사람을 초기화 시켜준다.

        if(this.start == false){ //만약에 게임이 시작되지 않았다면
            alert("아직 시작하지 않았습니다."); //"아직 시작하지 않았습니다"라는 알림창을 띄운다.
            this.inProgress = false; //게임 진행을 멈춘다.
        }
    }

    checkForWinner(){ //유저가 이겼는지 체크하는 함수
        const winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        //winningCombination안에 있는 배열들은 틱택토에서 이길 수 있는 경우의 수들이다. 
        winningCombination.forEach((wc) => { //a, b, c 번째 사각형에 들어있는 값(o나 x)이 같은지 확인해 줌
            const [a, b, c] = wc; //winningCombination 배열의 변수들을 임시로 저장하는 변수 wc
            const sqA = this.maps[a]; //sqA에 winningCombination의 값중 a자리에 있는 maps의 값을 저장함
            const sqB = this.maps[b]; //sqB에 winningCombination의 값중 b자리에 있는 maps의 값을 저장함
            const sqC = this.maps[c]; //sqC에 winningCombination의 값중 c자리에 있는 maps의 값을 저장함
    
            if(sqA.value && sqA.value === sqB.value && sqA.value === sqC.value){ //sqA의 값과 sqB의 값과 sqC의 값이 모두 같을 때
                this.inProgress = false; //게임의 진행을 멈춘다.
                this.winner = (this.currentTurn === this.name_1) ? this.name_2 : this.name_1; 
                //현재 턴이 name_1이면 승자는 name_2가 이긴 것으로 판별하고, 아니라면 name_1이 이긴 것으로 판별함
                //왜냐하면 위에서 이미 name_1일 때 name_2에게 넘겨줬기 때문에, currentTurn으로 하면 name_2가 이긴 것으로 판단됨.
                if(this.winner){
                    win.play();
                }
            }
        });

        if(this.winner === this.name_1){ //만약에 name_1이 이겼다면
            this.win_1++; //name_1의 이긴 횟수를 증가시킨다. = name_2의 진 횟수
        } else if(this.winner === this.name_2){ //만약에 name_2가 이겼다면
            this.lose_1++; //name_1의 진 횟수를 증가시킨다. = name_2의 이긴 횟수
        }

        if(this.movesMode === this.maps.length){ //무승부라면 (O,X를 그린 횟수와 maps의 길이가 같다면)
            draw.play();
            this.inProgress = false; //게임의 진행을 멈춘다.
        }
    }
}

var boom = new Audio("기말고사/boom.mp3");
var draw = new Audio("기말고사/draw.mp3");
var o = new Audio("기말고사/o_sound.mp3");
var x = new Audio("기말고사/x_sound.mp3");
var win = new Audio("기말고사/win.mp3");