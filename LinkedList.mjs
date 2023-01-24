class Node {
    // class를 instance로 만들었을 때 자동으로 호출되는 생성자
    constructor(data, next = null) {
        // next는 default parameter를 이용해 기본값을 null로 설정
        // data 매개변수는 필수값이지만 next 매개변수는 필수가 아니라는 의미
        this.data = data;
        this.next = next;
        // 일반적으로 생성자에서 프로퍼티 초기화를 해준다.
        // cf) JS에서 class 내의 변수를 프로퍼티(property)라고 한다.
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        // head : 연결리스트의 시작 노드를 담는 변수
        this.count = 0;
        // count : 총 node의 수를 담는 변수
    }

    // 원하는 index에 데이터를 삽입하는 함수
    insertAt(index, data) {
        // index : 삽입할 위치 / data : 삽입할 데이터

        if(index > this.count || index < 0) { // 예외처리
            // 매개변수로 넘어온 index가 연결리스트의 범위를 넘어가는 경우
            // (연결리스트의 범위보다 크거나 || 음수 위치에 삽입하는 경우)
            throw new Error("범위를 넘어갔습니다.");
        } else {
            // 새로 삽입할 node 생성
            let newNode = new Node(data);
            // 새로 생성한 node를 연결해야 하는데 2가지 CASE가 있다.
            if(index == 0) {
                // 1. 새로 생성된 node가 리스트의 가장 앞부분에 삽입되는 경우
                newNode.next = this.head;
                this.head = newNode;
            } else {
                // 2. 새로 생성된 node가 가장 앞부분을 제외하고 리스트의 다른 부분에 삽입되는 경우
                // 즉, 원하는 인덱스까지 노드를 타고 들어가서 새로 삽입해야 하는 경우
                let currentNode = this.head;
                // Node { data: 0, next: null }
                for (let i = 0; i < index - 1; i++) {
                    currentNode = currentNode.next;
                }
                newNode.next = currentNode.next;
                currentNode.next = newNode;
            }
            this.count++;
        }
    }

    // 원하는 index의 데이터를 삭제하는 함수
    deleteAt(index) {
        if(index > this.count || index < 0) { // 예외처리
            throw new Error("제거할 수 없습니다.");
        }

        let currentNode = this.head;
        // node를 삭제 하는데 2가지 CASE가 있다.
        // 1. 첫번째 node를 제거하는 경우
        // 2. 첫번째 node를 제외한 다른 위치의 node를 제거하는 경우
        if(index == 0) {
            let deletedNode = this.head;
            this.head = this.head.next;
            this.count--;
            return deletedNode;
        } else {
            for (let i = 0; i < index - 1; i++) {
                currentNode = currentNode.next;
            }

            let deletedNode = currentNode.next;
            currentNode.next = currentNode.next.next;
            this.count--;
            return deletedNode;
        }
    }

    // 연결리스트의 모든 원소를 출력해주는 함수
    printAll() {
        let currentNode = this.head;
        let text = "[";
        while(currentNode != null) {
            text += currentNode.data;
            currentNode = currentNode.next;
            if(currentNode != null) {
                text += ", ";
            }
        }
        text += "]";
        console.log(text);
    }

    // 연결리스트의 모든 원소를 제거하는 함수
    clear() {
        this.head = null;
        this.count = 0;
    }

    // 마지막 데이터 뒤에 삽입하는 함수
    insertLast(data) {
        this.insertAt(this.count, data);
    }

    // 마지막 데이터를 삭제하는 함수
    deleteLast(index) {
        this.deleteAt(this.count - 1);
    }

    // 해당 index의 Node를 읽어주는 함수
    getNodeAt(index) {
        if(index > this.count || index < 0) { // 예외처리
            throw new Error("범위를 넘어갔습니다.");
        }

        let currentNode = this.head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
}

export {Node, LinkedList};