
    module.exports = getDate


    function getDate() {
        let today = new Date()
    
        let options = {
            weekday: 'long',
            year: 'numeric',            
            month: 'long'
        }
        let day = today.toLocaleDateString("en-US", options)
        
        return day
    }
    