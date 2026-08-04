import { describe, expect, it } from 'vitest';
import { clamp, format, formatTime } from './format';

describe('utilitários de formatação', () => {
  it('interpola variáveis e preserva chaves desconhecidas', () => {
    expect(format('{current} de {total}', { current: 2, total: 7 })).toBe('2 de 7');
    expect(format('{a} {b}', { a: 'x' })).toBe('x {b}');
  });

  it('formata o tempo do player em mm:ss e protege valores inválidos', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(75)).toBe('1:15');
    expect(formatTime(Number.NaN)).toBe('0:00');
    expect(formatTime(-10)).toBe('0:00');
  });

  it('limita valores dentro do intervalo', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(99, 0, 10)).toBe(10);
  });
});
