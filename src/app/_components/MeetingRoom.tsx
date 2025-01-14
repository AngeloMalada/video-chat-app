'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  ParticipantView,
  SpeakerLayout,
  StreamTheme,
  StreamVideoParticipant,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shadcn';
import { EndCallButton, Loader } from '@components';
import { cn } from '@/lib';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState, useLocalParticipant, useRemoteParticipants } =
    useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return (
          <StreamTheme className="relative">
            <MyParticipantList participants={remoteParticipants} />
            <MyFloatingLocalParticipant participant={localParticipant} />
          </StreamTheme>
        );
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* video layout and call controls */}
      <div className="fixed top-0 z-50 flex w-full flex-col items-center justify-center gap-2 bg-[#252525] md:flex-row md:gap-5">
        <CallControls onLeave={() => router.push(`/`)} />
        <div className="flex gap-5">
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button>
        </div>
        {!isPersonalRoom && <EndCallButton />}
      </div>
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full items-center">
          {/* <CallLayout /> */}
          <CallLayout />
        </div>
        <div
          className={cn('ml-2 hidden h-[calc(100vh-86px)]', {
            'show-block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;

export const MyParticipantList = (props: {
  participants: StreamVideoParticipant[];
}) => {
  const { participants } = props;
  return (
    <div className="flex h-full w-[100vw] flex-row gap-2">
      {participants.map((participant) => (
        <div
          className="aspect-video w-full rounded-b-lg"
          key={participant.userId}
        >
          <ParticipantView
            muteAudio
            participant={participant}
            key={participant.sessionId}
          />
        </div>
      ))}
    </div>
  );
};

export const MyFloatingLocalParticipant = (props: {
  participant?: StreamVideoParticipant;
}) => {
  const { participant } = props;
  return (
    <div className="absolute left-12 top-24 aspect-video w-64 rounded-lg shadow-lg">
      {participant && <ParticipantView muteAudio participant={participant} />}
    </div>
  );
};
