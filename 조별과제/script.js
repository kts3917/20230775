let students = JSON.parse(localStorage.getItem('studentData')) || [
        { id: "20230775", name: "源��쒖꽦", score: 95, grade: "A", major: "而댄벂�곌났�숆낵" }
    ];

    function calculateGrade(score) {
        const num = parseInt(score) || 0;
        if (num >= 90) return 'A';
        if (num >= 80) return 'B';
        if (num >= 70) return 'C';
        if (num >= 60) return 'D';
        return 'F';
    }

    function renderTable(data = students) {
        const tbody = document.querySelector('.student-box tbody');
        tbody.innerHTML = ""; 

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="color: #999; padding: 20px;">�깅줉�� �숈깮�� �놁뒿�덈떎.</td></tr>`;
            return;
        }

        data.forEach((student) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="student_num">${student.id}</td>
                <td class="name">${student.name}</td>
                <td>
                    <select class="score" onchange="updateGrade('${student.id}', this.value)">
                        <option value="A" ${student.grade === 'A' ? 'selected' : ''}>A</option>
                        <option value="B" ${student.grade === 'B' ? 'selected' : ''}>B</option>
                        <option value="C" ${student.grade === 'C' ? 'selected' : ''}>C</option>
                        <option value="D" ${student.grade === 'D' ? 'selected' : ''}>D</option>
                        <option value="F" ${student.grade === 'F' ? 'selected' : ''}>F</option>
                    </select>
                </td>
                <td class="major">${student.major}</td>
                <td>
                    <button type="button" class="bt-del" onclick="deleteStudent('${student.id}')">��젣</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('studentData', JSON.stringify(students));
    }

    function addStudent() {
        const inputs = document.querySelectorAll('.student-add input');
        const idInput = inputs[0];
        const nameInput = inputs[1];
        const scoreInput = inputs[2];
        const majorInput = inputs[3];

        if (!idInput.value || !nameInput.value || !scoreInput.value || !majorInput.value) {
            alert("紐⑤뱺 鍮덉뭏�� �낅젰�댁＜�몄슂!");
            return;
        }

        if (students.some(s => s.id === idInput.value)) {
            alert("�대� 議댁옱�섎뒗 �숇쾲�낅땲��.");
            return;
        }

        const calculatedGrade = calculateGrade(scoreInput.value);

        students.push({
            id: idInput.value,
            name: nameInput.value,
            score: parseInt(scoreInput.value) || 0, 
            grade: calculatedGrade,                
            major: majorInput.value
        });

        saveToLocalStorage();
        renderTable();

        idInput.value = "";
        nameInput.value = "";
        scoreInput.value = "";
        majorInput.value = "";
    }


    function deleteStudent(id) {
        if (confirm("�뺣쭚 �� �숈깮�� ��젣�섏떆寃좎뒿�덇퉴?")) {
            students = students.filter(student => student.id !== id);
            saveToLocalStorage();
            renderTable();
        }
    }

    function updateGrade(id, newGrade) {
        const student = students.find(s => s.id === id);
        if (student) {
            student.grade = newGrade;
            
            if (newGrade === 'A') student.score = 95;
            else if (newGrade === 'B') student.score = 85;
            else if (newGrade === 'C') student.score = 75;
            else if (newGrade === 'D') student.score = 65;
            else if (newGrade === 'F') student.score = 50;

            saveToLocalStorage();
        }
    }

    function filterStudents() {
        const query = document.querySelector('.search input').value.toLowerCase();
        const filtered = students.filter(student => 
            student.name.toLowerCase().includes(query) || 
            student.id.includes(query)
        );
        renderTable(filtered);
    }


    function sortStudents() {
        const sortType = document.querySelector('.search select').value;
        let sorted = [...students];

        if (sortType === "idAsc") {
            sorted.sort((a, b) => a.id.localeCompare(b.id));
        } else if (sortType === "nameAsc") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortType === "scoreDesc") {
            sorted.sort((a, b) => b.score - a.score); 
        }

        const query = document.querySelector('.search input').value.toLowerCase();
        if (query) {
            sorted = sorted.filter(student => 
                student.name.toLowerCase().includes(query) || 
                student.id.includes(query)
            );
        }
        renderTable(sorted);
    }

    window.onload = function() {
        renderTable();
        document.querySelector('.student-add button').addEventListener('click', addStudent);
        document.querySelector('.search input').addEventListener('keyup', filterStudents);
        document.querySelector('.search select').addEventListener('change', sortStudents);
    };
