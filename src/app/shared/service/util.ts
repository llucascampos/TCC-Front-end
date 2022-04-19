export class Util {
    

    static convertDateForSave(date: any = '') {
        if(date == ''){
            let data = new Date(),
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'),
            ano  = data.getFullYear();
            return `${ano}-${mes}-${dia}`;
        } else {
            let data = new Date(date),
            dia  = data.getDate().toString().padStart(2, '0'),
            mes  = (data.getMonth()+1).toString().padStart(2, '0'),
            ano  = data.getFullYear();
            return `${ano}-${mes}-${dia}`;
        }
    }

}