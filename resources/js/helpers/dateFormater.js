const dateFormater = (inputdate) => {
    const date = new Date(inputdate);

    var months = [
        "янв",
        "фев",
        "мар",
        "апр",
        "мая",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
    ];

    const day = date.getDate();

    const monthIndex = date.getMonth();
    const month = months[monthIndex];

    const year = date.getFullYear().toString().slice(-2);

    const hours = date.getHours();
    let minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return day + " " + month + " " + year + "г. " + hours + ":" + minutes;  
};

export default dateFormater
