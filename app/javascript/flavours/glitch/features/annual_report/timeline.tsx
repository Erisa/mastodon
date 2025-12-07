import { useCallback } from 'react';
import type { FC } from 'react';

import { openModal } from '@/flavours/glitch/actions/modal';
import {
  generateReport,
  selectWrapstodonYear,
} from '@/flavours/glitch/reducers/slices/annual_report';
import { useAppDispatch, useAppSelector } from '@/flavours/glitch/store';

import { AnnualReportAnnouncement } from './announcement';

export const AnnualReportTimeline: FC = () => {
  const { state } = useAppSelector((state) => state.annualReport);
  const year = useAppSelector(selectWrapstodonYear);

  const dispatch = useAppDispatch();
  const handleBuildRequest = useCallback(() => {
    void dispatch(generateReport());
  }, [dispatch]);

  const handleOpen = useCallback(() => {
    dispatch(openModal({ modalType: 'ANNUAL_REPORT', modalProps: {} }));
  }, [dispatch]);

  if (!year || !state || state === 'ineligible') {
    return null;
  }

  return (
    <AnnualReportAnnouncement
      year={year.toString()}
      hasData={state === 'available'}
      isLoading={state === 'generating'}
      onRequestBuild={handleBuildRequest}
      onOpen={handleOpen}
    />
  );
};
