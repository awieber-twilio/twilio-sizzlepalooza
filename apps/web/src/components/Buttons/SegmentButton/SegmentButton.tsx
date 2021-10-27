import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { trackAction } from '../../../utils/TwilioActions';

import { Button } from '@material-ui/core';

import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../../state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: theme.brand,
      color: 'white',
      '&:hover': {
        background: '#600101',
      },
    },
  })
);

export default function SegmentButton(props: { className?: string }) {
  const classes = useStyles();

  async function segment() {
    console.log('Insert Segment Call here');
    trackAction('segmentButtonPress');
  }

  return (
    <Button onClick={segment} className={clsx(classes.button, props.className)} data-cy-disconnect>
      SEGMENT
    </Button>
  );
}
