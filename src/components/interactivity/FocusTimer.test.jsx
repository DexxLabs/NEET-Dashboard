import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FocusTimer } from './FocusTimer';

// Mock the Zustand stores
const mockAddXP = vi.fn();
vi.mock('../../store/useStore', () => ({
  useStore: (selector) => {
    const state = { addXP: mockAddXP };
    return selector(state);
  },
}));

vi.mock('../../store/useTheme', () => ({
  useTheme: (selector) => {
    const state = { theme: 'default' };
    return selector(state);
  },
}));

describe('FocusTimer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockAddXP.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders with 60 minutes default', () => {
    render(<FocusTimer />);
    expect(screen.getByDisplayValue('60')).toBeInTheDocument();
    expect(screen.getByText('60:00')).toBeInTheDocument();
  });

  it('activates flow state after 10 minutes and adds real-time XP', () => {
    render(<FocusTimer />);

    const startBtn = screen.getByText('START FOCUS');
    fireEvent.click(startBtn);

    // Fast-forward 9 minutes (540 seconds)
    act(() => {
      vi.advanceTimersByTime(540 * 1000);
    });

    // Should still be entering flow state
    expect(screen.getByText('🧱 ENTERING FLOW STATE')).toBeInTheDocument();

    // Fast-forward 1 more minute (600 seconds total)
    act(() => {
      vi.advanceTimersByTime(60 * 1000);
    });

    // Now should be in flow state
    expect(screen.getByText('🌊 IN FLOW STATE')).toBeInTheDocument();

    // Check that XP was added at the 10th minute (600 seconds) with the congratulations message
    expect(mockAddXP).toHaveBeenCalledWith(1, '🎉 Congratulations! You have entered Flow State!');

    mockAddXP.mockClear();

    // Fast-forward another 1 minute (11th minute total)
    act(() => {
      vi.advanceTimersByTime(60 * 1000);
    });

    // Should add 2 XP for Flow State (no message)
    expect(mockAddXP).toHaveBeenCalledWith(2, null);
  });

  it('shows confirm modal when "I got distracted" is clicked', () => {
    render(<FocusTimer />);

    fireEvent.click(screen.getByText('START FOCUS'));

    // Fast forward 1 minute so distracted button is visible
    act(() => {
      vi.advanceTimersByTime(60 * 1000);
    });

    fireEvent.click(screen.getByText('I got distracted 😔', { exact: false }));

    // The custom confirm modal should appear in the DOM
    expect(screen.getByText('Checking your phone? This will reset your Flow State buildup!')).toBeInTheDocument();
    expect(screen.getByText("Yes, I'm sure")).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('resets flow buildup when "I got distracted" is confirmed', () => {
    render(<FocusTimer />);

    fireEvent.click(screen.getByText('START FOCUS'));

    // Fast forward 5 minutes to build some flow progress
    act(() => {
      vi.advanceTimersByTime(300 * 1000);
    });

    // Click distracted button — this opens the custom modal
    fireEvent.click(screen.getByText('I got distracted 😔', { exact: false }));

    // Confirm via the modal's "Yes, I'm sure" button
    fireEvent.click(screen.getByText("Yes, I'm sure"));

    // Fast forward another 6 minutes (11 min total elapsed, but focus reset at 5 min)
    act(() => {
      vi.advanceTimersByTime(360 * 1000);
    });

    // Since flow was reset at 5 min, 6 more min = only 6 min of focus
    // Still below the 10 min threshold → still entering flow state
    expect(screen.getByText('🧱 ENTERING FLOW STATE')).toBeInTheDocument();
  });
});
