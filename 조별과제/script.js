    let students = JSON.parse(localStorage.getItem('studentData')) || [
        { id: "20230775", name: "김태성", score: 95, grade: "A", major: "컴퓨터공학과" }
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
            tbody.innerHTML = `<tr><td colspan="5" style="color: #999; padding: 20px;">등록된 학생이 없습니다.</td></tr>`;
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
                    <button type="button" class="bt-del" onclick="deleteStudent('${student.id}')">삭제</button>
                </td>
            `;
            tbody.appendChild(row);
