'use client';

import TopBar from '@/components/Common/TopBar/TopBar';
import PlaceRegister from '@/components/Layout/PlaceRegister/PlaceRegister';
import Button from '@/components/Common/Button/Button';
import PlusIconSrc from '@styles/Icon/Plus.svg';

import {
  ButtonLayout,
  PlaceLayout,
  PlaceRegisterWrapper,
} from './PlaceRegister.styles';
import { PageWrapper } from '@/app/commonPage.styles';

import useUploadFiles from '@/hooks/placeRegister/useUploadFiles';
import usePlaceRegisterModeStore from '@/stores/placeRegisterModeStore';
import usePlaceRegisterStore from '@/stores/placeRegisterStore';
import useControlButton from '@/hooks/placeRegister/useContorlButtons';
import { useEffect } from 'react';

const PlaceRegisterPage = () => {
  // placeRegister 들어오면 PlaceList 정보 초기화
  useEffect(() => {
    initPlaceList();
  }, []);

  // client state 불러오는 custom hook
  const { handleUploadFiles } = useUploadFiles();
  const { handleAddPlaceList } = useControlButton();

  // store state 불러오는 로직
  const { isInputComplete, isSubmitReady } = usePlaceRegisterModeStore();
  const { placeList, initPlaceList } = usePlaceRegisterStore();

  return (
    <>
      <TopBar NavType="default" label="장소 등록하기" />
      <PageWrapper>
        <PlaceRegisterWrapper>
          <PlaceLayout>
            {placeList.map((_, index) => (
              <PlaceRegister
                key={index}
                index={index}
                title={'장소 ' + (index + 1)}
              />
            ))}
            <Button
              buttonType={isInputComplete ? 'purple' : 'lightGray'}
              buttonHeight="short"
              label="장소추가"
              icon={PlusIconSrc}
              onClick={isInputComplete ? handleAddPlaceList : undefined}
            />
          </PlaceLayout>
          <ButtonLayout>
            <Button
              buttonType={isSubmitReady ? 'purple' : 'gray'}
              label="작성 완료"
              onClick={isSubmitReady ? handleUploadFiles : undefined}
            />
          </ButtonLayout>
        </PlaceRegisterWrapper>
      </PageWrapper>
    </>
  );
};
export default PlaceRegisterPage;