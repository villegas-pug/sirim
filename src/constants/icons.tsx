import {
   AddBox,
   ArrowUpward,
   Check,
   ChevronLeft,
   ChevronRight,
   Clear,
   DeleteOutline,
   Edit,
   FilterList,
   FirstPage,
   LastPage,
   Remove,
   SaveAlt,
   Search,
   ViewColumn,
   Cloud,
   Build,
   BarChartRounded,
   PageviewRounded,
   LiveHelp,
   Settings,
   Person,
   SupervisorAccount,
   Home,
   AddCircle,
   FindInPage,
   TrendingUp,
   Flag,
   CardMembership,
   Man,
   Woman,
   SendAndArchive,
   MarkEmailRead,
   MarkEmailUnread,
   HourglassDisabled,
   AccountTree,
   FactCheck,
   SupportAgent,
   StorageRounded,
   GroupsRounded,
   EmailOutlined,
   MarkEmailReadOutlined,
   PendingActionsOutlined,
   TaskOutlined,
   ContentPasteSearchOutlined,
   CleaningServicesRounded
} from '@mui/icons-material'

const classes = {
   subModIcon: {
      fontSize: 70
   }
}

export const elementIcons = {
   Ceremonies: <CardMembership fontSize='large' />,
   Nationalized: <Flag fontSize='large' />,
   Man: <Man fontSize='large' />,
   Woman: <Woman fontSize='large' />,
   EmailOutlined: <EmailOutlined fontSize='large' />,
   MarkEmailReadOutlined: <MarkEmailReadOutlined fontSize='large' />,
   PendingActionsOutlined: <PendingActionsOutlined fontSize='large' />,
   TaskOutlined: <TaskOutlined fontSize='large'/>,

   /* » MOD'S...  */
   Home: <Home fontSize='small' sx={{ color: 'white' }} />,
   Person: <Person fontSize='small' sx={{ color: 'white' }} />,
   SupervisorAccount: <SupervisorAccount fontSize='small' />,
   AddBox: <AddBox fontSize='small' />,
   Settings: <Settings fontSize='small' />,
   LiveHelp: <LiveHelp fontSize='small' />,
   BarChartRounded: <BarChartRounded fontSize='small' />,
   AccountTree: <AccountTree fontSize='small' />,

   /* » SUB-MOD'S...  */
   Create: <AddCircle color='action' style={classes.subModIcon} />,
   FindInPage: <FindInPage color='action' style={classes.subModIcon} />,
   TrendingUp: <TrendingUp color='action' style={classes.subModIcon} />,
   SupportAgent: <SupportAgent color='action' style={classes.subModIcon} />,
   FactCheck: <FactCheck color='action' style={classes.subModIcon} />,
   StorageRounded: <StorageRounded color='action' style={classes.subModIcon} />,
   GroupsRounded: <GroupsRounded color='action' style={classes.subModIcon} />,
   ContentPasteSearchOutlined: <ContentPasteSearchOutlined color='action' style={classes.subModIcon} />,
   CleaningServicesRounded: <CleaningServicesRounded color='action' style={ classes.subModIcon } />,

   Test: <Build />,
   Cloud: <Cloud />,
   Check: <Check />,
   Clear: <Clear />,
   Delete: <DeleteOutline />,
   DetailPanel: <ChevronRight />,
   Edit: <Edit />,
   PageviewRounded: <PageviewRounded />,

   /* » ...  */
   SendAndArchive: <SendAndArchive fontSize='large' />,
   MarkEmailRead: <MarkEmailRead fontSize='large' />,
   MarkEmailUnread: <MarkEmailUnread fontSize='large' />,
   HourglassDisabled: <HourglassDisabled fontSize='large' />

}

export const componentIcons: any = {
   Export: SaveAlt,
   Filter: FilterList,
   FirstPage: FirstPage,
   LastPage: LastPage,
   NextPage: ChevronRight,
   PreviousPage: ChevronLeft,
   ResetSearch: Clear,
   Search: Search,
   SortArrow: ArrowUpward,
   ThirdStateCheck: Remove,
   ViewColumn: ViewColumn
}

export type IconAppTypes = keyof typeof elementIcons
