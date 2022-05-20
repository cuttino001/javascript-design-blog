function User(name, age, career, works){
    this.name = name;
    this.age  = age;
    this.career = career;
    this.works = works;
}

function Factory(name, age, career){
    let works;
    switch (career) {
        case 'coder':
            works = ['写代码', '改bug']
            break;
        case 'product manager':
            works = ['写需求', '催']
            break;
    
        default:
            break;
    }
    return new User(name, age, career, works);
}

/*
工厂模式的简单之处，在于它的概念相对好理解：将创建对象的过程单独封装，这样的操作就是工厂模式。同时它的应用场景也非常容易识别：有构造函数的地方，我们就应该想到简单工厂；在写了大量构造函数、调用了大量的 new、自觉非常不爽的情况下，我们就应该思考是不是可以掏出工厂模式重构我们的代码了。
*/