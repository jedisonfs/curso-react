// Debe tener al menos uma prueba
import { expect, test } from "vitest";
import { add } from "./math.helper";

test('should add two positives numbers', () => {
    // 1. Arrange
    const a = 1;
    const b = 2;
    // 2. Act
    const result = add(1, 1);
    // 3. Assert
    expect(result).toBe(2);
});