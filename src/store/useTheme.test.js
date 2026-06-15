import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';

// Provide a fake localStorage for tests
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (k) => store[k] ?? null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: (k) => store[k] ?? null,
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock });

describe('useTheme store', () => {
  beforeEach(() => {
    localStorageMock.clear();
    sessionStorageMock.clear();
    vi.resetModules();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('starts with default theme', async () => {
    const { useTheme } = await import('./useTheme');
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('default');
  });

  it('cycles default → kawaii → cozy → default', async () => {
    const { useTheme } = await import('./useTheme');
    const { result } = renderHook(() => useTheme());

    // default → kawaii
    act(() => { result.current.toggleTheme(); });
    // Advance internal timeout for changing theme behind the boot screen
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current.theme).toBe('kawaii');
    expect(result.current.bootingTo).toBe('kawaii');
    // complete boot manually (usually called by BootScreen component)
    act(() => { result.current.completeBoot(); });

    // kawaii → cozy
    act(() => { result.current.toggleTheme(); });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current.theme).toBe('cozy');
    expect(result.current.bootingTo).toBe('cozy');
    act(() => { result.current.completeBoot(); });

    // cozy → default
    act(() => { result.current.toggleTheme(); });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current.theme).toBe('default');
    expect(result.current.bootingTo).toBe('default');
    act(() => { result.current.completeBoot(); });
  });

  it('sets nitu-cozy-just-toggled in sessionStorage when switching to cozy', async () => {
    const { useTheme } = await import('./useTheme');
    const { result } = renderHook(() => useTheme());

    // Go to kawaii first
    act(() => { result.current.toggleTheme(); });
    act(() => { vi.advanceTimersByTime(200); });
    act(() => { result.current.completeBoot(); });

    // Go to cozy
    act(() => { result.current.toggleTheme(); });

    // The flag should be set immediately
    expect(sessionStorageMock.getItem('nitu-cozy-just-toggled')).toBe('true');
  });

  it('removes nitu-cozy-booted when toggling away from cozy', async () => {
    localStorageMock.setItem('nitu-cozy-booted', 'true');

    const { useTheme } = await import('./useTheme');
    const { result } = renderHook(() => useTheme());
    
    // Manually force the theme to cozy
    act(() => {
      useTheme.setState({ theme: 'cozy' });
    });

    act(() => { result.current.toggleTheme(); });

    expect(localStorageMock.getItem('nitu-cozy-booted')).toBeNull();
  });
});
