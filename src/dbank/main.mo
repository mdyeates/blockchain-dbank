import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 0;
  // currentValue := 100;

  stable var startTime = Time.now();
  // Debug.print(debug_show(startTime));

  let id = 2342342526346;
  // Debug.print(debug_show(id));

  public func topUp(amount: Float) {
  currentValue += amount;
  Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) {
    let tempValue: Float = currentValue - amount;

    if (tempValue >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Insufficient funds");
    };
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNanoSeconds = currentTime - startTime;
    let timeElapsedSeconds = timeElapsedNanoSeconds / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedSeconds / 10));

    startTime := currentTime;
  }

  // topUp();

}
