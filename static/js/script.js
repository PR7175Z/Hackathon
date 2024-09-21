document.getElementById('teamDivider').addEventListener('click', () => {
    async function processResponse() {
        async function get_response() {
            const api = 'http://127.0.0.1:8001/predict';
            const response = await fetch(api,{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {data}; 
        } 
    
        groupedData = await get_response();
    
        for(let i=0; i<Object.keys(groupedData.data).length; i++){
    
            let gparentDiv = document.createElement('div');
            gparentDiv.classList.add('col-md-6');
            let parentDiv = document.createElement('div');
            parentDiv.classList.add('row');
    
            for (let key in groupedData.data[i]) {
                const div = document.createElement('div');
                let name = document.createElement('p');
                let email = document.createElement('p');
                let skill = document.createElement('p');
    
                div.classList.add('groupitems')
                div.classList.add('col-md-6')
    
                name.innerHTML = groupedData.data[i][key]['Name'];
                email.innerHTML = groupedData.data[i][key]['Email'];
                coding = groupedData.data[i][key]['Coding'];
                Leadership = groupedData.data[i][key]['Leadership'];
                communication = groupedData.data[i][key]['Communication Skill'];
                presentation = groupedData.data[i][key]['Presentation designing'];
    
                skills = {'Coding': coding, 'Leadership': Leadership, 'Communication' : communication, 'Presentation': presentation}
                const topTwoSpecialities = Object.entries(skills).sort(([, a], [, b]) => b - a).slice(0, 2).map(([key]) => key); 
    
                topTwoSpecialities.forEach((e)=>{
                    const specialityElement = document.createElement('span');
                    specialityElement.textContent = e;
                    skill.appendChild(specialityElement);
                })
    
                div.appendChild(name);
                div.appendChild(email);
                div.appendChild(skill);
    
                parentDiv.appendChild(div);
            }
            gparentDiv.appendChild(parentDiv);
            document.getElementById('itemdisplay').appendChild(gparentDiv);
        }
    }
    processResponse();
})

