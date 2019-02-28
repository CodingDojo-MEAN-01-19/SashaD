class Bike {
    price: number;
    max_speed: number;
    miles: number;
    constructor(price: number, max_speed: number) { 
    this.price = price;
    this.max_speed = max_speed;
    this.miles = 0;
    }   
    displayInfo = () => {
        console.log(`The bike costs ${this.price} and can get up to ${this.max_speed} miles per hour and currently has ${this.miles} miles on it`);
    }      
    ride = () => {
        console.log('Riding!')
        this.miles = this.miles + 10;
        return this;
    }
        reverse = () => {
            this.miles = this.miles - 5;
            if (this.miles < 0){
                this.miles = 0;
                console.log(`The bike cannot reverse any further`)
            } else {
              console.log('Reversing!')
            }
            return this;
        }
  }
  
  const BMX = new Bike(200, 45);
  BMX.ride().ride().ride()
  BMX.displayInfo()
  BMX.reverse()
  BMX.displayInfo()
  BMX.reverse().reverse()
  BMX.displayInfo()