import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { doc, updateDoc, Firestore } from 'firebase/firestore';
import { X, Trash2, Plus, RotateCcw, ArrowLeft } from 'lucide-react';
import { Household } from './App';
import {
  FormGroup,
  Label,
  Input,
  ResetButton,
  IconButton,
} from './SharedComponents';

// Styled Components (Specific to Settings)
const SettingsPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fdfcfb;
  z-index: 1000;
  overflow-y: auto;
`;

const SettingsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
`;

const SettingsTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.25rem;

  &:hover {
    color: #2c3e50;
  }
`;

export default function SettingsScreen({
  isOpen,
  onClose,
  household,
  activeChild,
  setActiveChild,
  onLeaveHousehold,
  onStartNewPeriod,
  db,
}: {
  isOpen: boolean;
  onClose: () => void;
  household: Household;
  activeChild: string;
  setActiveChild: (id: string) => void;
  onLeaveHousehold: () => void;
  onStartNewPeriod: () => void;
  db: Firestore;
}) {
  const [settingsName, setSettingsName] = useState(household.name);
  const [newMemberName, setNewMemberName] = useState('');

  useEffect(() => {
    setSettingsName(household.name);
  }, [household.name]);

  if (!isOpen) return null;

  return (
    <SettingsPage>
      <SettingsContainer>
        <SettingsHeader>
          <SettingsTitle>Settings</SettingsTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </SettingsHeader>
        <h2>Household</h2>
        <FormGroup>
          <Label>Name</Label>
          <Input
            value={settingsName}
            onChange={(e) => setSettingsName(e.target.value)}
            onBlur={async () => {
              if (settingsName.trim() !== household.name) {
                await updateDoc(doc(db, 'households', household.id), {
                  name: settingsName.trim(),
                });
              }
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Members</Label>
          {household.members.map((member) => (
            <div
              key={member.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <Input
                value={member.name}
                readOnly
                style={{ marginBottom: 0, backgroundColor: '#f8f9fa' }}
              />
              <IconButton
                style={{ position: 'static', color: '#e74c3c' }}
                onClick={async () => {
                  if (confirm(`Remove ${member.name}?`)) {
                    const newMembers = household.members.filter(
                      (m) => m.id !== member.id
                    );
                    await updateDoc(doc(db, 'households', household.id), {
                      members: newMembers,
                    });
                    if (activeChild === member.id && newMembers.length > 0) {
                      setActiveChild(newMembers[0].id);
                    }
                  }
                }}
              >
                <Trash2 size={20} />
              </IconButton>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Input
              placeholder="New Member Name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              style={{ marginBottom: 0 }}
            />
            <ResetButton
              style={{
                margin: 0,
                padding: '0.5rem 1rem',
                background: '#3498db',
              }}
              onClick={async () => {
                if (newMemberName.trim()) {
                  const newId = newMemberName
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-');
                  const newMember = { id: newId, name: newMemberName.trim() };
                  const newMembers = [...household.members, newMember];
                  await updateDoc(doc(db, 'households', household.id), {
                    members: newMembers,
                  });
                  setNewMemberName('');
                }
              }}
            >
              <Plus size={20} />
            </ResetButton>
          </div>
        </FormGroup>
        <ResetButton
          onClick={onLeaveHousehold}
          style={{
            width: '100%',
            justifyContent: 'center',
            marginTop: '1rem',
            backgroundColor: '#95a5a6',
          }}
        >
          <ArrowLeft size={18} />
          Leave Household
        </ResetButton>
        <FormGroup>
          <Label as="h2">Period Management</Label>
          <ResetButton
            onClick={onStartNewPeriod}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <RotateCcw size={18} />
            Start New Period
          </ResetButton>
        </FormGroup>
      </SettingsContainer>
    </SettingsPage>
  );
}
