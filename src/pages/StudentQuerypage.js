import * as React from 'react';

import { Card, Container, Stack, Typography } from '@mui/material';
import StudentQuery from '../sections/@dashboard/StudentQuery/StudentQuery';
import StudentQueryForm from '../sections/@dashboard/StudentQuery/StudentQueryForm';

export default function StudentQuerypage() {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Student Help Desk
          </Typography>
        </Stack>
        {/* ==================(edit popup)======================================== */}

        <Card
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <StudentQuery />
        </Card>
      </Container>
    </>
  );
}
