export default function() {
  return [
    {
      title: "전체보기",
      to: "/all",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "CCTV",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/cctv",
    },
    {
      title: "전자문서",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/documents",
    },
    {
      title: "체크리스트",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/checklist",
    },
    {
      title: "온도 센서",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/temp",
    },
    {
      title: "압력 센서",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/pressure",
    },
    {
      title: "적외선 센서",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/ray",
    }
  ];
}
