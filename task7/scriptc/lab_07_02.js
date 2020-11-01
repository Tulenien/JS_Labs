"use strict";
// функция для вызова программы и получения результата её работы
function useCmd(s)
{
	const options = {encoding: 'utf8'};
	const cmd = s.toString();
	const answer = execSync(cmd, options);
	return answer.toString();
}

const { argv } = require('process');
const execSync = require('child_process').execSync;

for (let i = 2; i < argv.length; i++){
    const value = "" + process.argv[i];
    const facCommand = `node factor.js ${value}`;
    let result = useCmd(facCommand);
    result = parseInt(result);
    console.log("Факториал числа: " + value + " равен: " + result);
}

