import styled from '@emotion/styled';
import { IconButton } from './SharedComponents';

// App.tsx styles
export const Container = styled.div`
  width: 100%;
  max-width: 100rem;
  margin: 0 auto;
  padding: 1rem;
  min-height: 100vh;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
`;

export const BackButton = styled(IconButton)`
  right: auto;
  left: 0;
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 3rem; /* Left of the settings/menu icon */
  color: #3498db;
  animation: spin 1s linear infinite;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  display: flex;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 0.75rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#3498db' : '#ecf0f1')};
  color: ${(props) => (props.active ? 'white' : '#7f8c8d')};
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    background-color: ${(props) => (props.active ? '#2980b9' : '#bdc3c7')};
  }
`;

export const BalanceDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: 1px solid #ecf0f1;
`;

export const BalanceLabel = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BalanceValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const DateScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.75rem;
  padding: 0.5rem 0.25rem;
  margin-bottom: 1.5rem;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DateCard = styled.button<{ active: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 4.5rem;
  padding: 0.75rem 0.5rem;
  background: ${(props) => (props.active ? '#2c3e50' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#2c3e50')};
  border: 1px solid ${(props) => (props.active ? '#2c3e50' : '#ecf0f1')};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const DateCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
`;

export const DateWeekday = styled.span`
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  opacity: 0.8;

  .long {
    display: none;
  }
  .short {
    display: block;
  }

  @media (min-width: 640px) {
    .long {
      display: block;
    }
    .short {
      display: none;
    }
  }
`;

export const DateDay = styled.span`
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const ChoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1rem;
`;

export const ChoreCard = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid ${(props) => (props.active ? '#2ecc71' : 'transparent')};
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.98);
  }
`;

export const ChoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ChoreName = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
`;

export const ChoreValue = styled.span`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

export const ChoreCount = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CountBadge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2ecc71;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
`;

export const DecrementButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #e74c3c;
  background: transparent;
  color: #e74c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;

  &:active {
    background: #e74c3c;
    color: white;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #ecf0f1;
`;

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #ecf0f1;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const CardMeta = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// SettingsScreen.tsx styles
export const SettingsPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fdfcfb;
  z-index: 1000;
  overflow-y: auto;
`;

export const SettingsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

export const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

export const SettingsTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.25rem;

  &:hover {
    color: #2c3e50;
  }
`;
