import React from "react";
import styles from "../../styles/pages.module.css";
import SideMenu from "../../components/sideMenu/sideMenu";
import Head from "../../components/head";
import Component from "../../components/sample/CreateContactDetails";

export default class CreateContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      modalVisibility: false,
      editable: undefined,
      selectedData: undefined,
      pageNumber: 0,
	    showTimeline: false,
      com_id:123,
      arr_com_claim: [],
      arr_parentTable: [],
      arr_exportData: [],
      activeRow: null,
      arr_comments_status: [],
      array_projName: [],
      commentEditVisibility: false,
      err_message: "",
      columnHeaders: [],
      arr_status: [
        {
          id: 1,
          title: "Active",
          value: "active",
        },
        {
          id: 2,
          title: "In-Active",
          value: "inactive",
        },
        {
          id: 3,
          title: "All",
          value: "all",
        },
      ],
      id_selectedStatus: undefined,
    };
  }

  componentDidMount() {}

  render() {
    const {
      selectedData,
      modalVisibility,
      editable,
    } = this.state;

    return (
      <div>
        {modalVisibility && (
          <Component
            visibility={modalVisibility}
            setVisibility={(v) => this.setState({ modalVisibility: v })}
            data={selectedData}
            editable={editable}
            getData={() => this.getData()}
          />
        )}

        <SideMenu tag="TsProject">
          <Head title="Project Details" />
          <div className={styles.wrapper}>
            <div>
                    <div className={`${styles.button}`}>
                      <button
                        className={`button`}
                        onClick={() =>
                          this.setState({
                            modalVisibility: true,
                            editable: undefined,
                            selectedData: undefined,
                          })
                        }
                      >
                        <i style={{ paddingRight: 10 }} class="fa fa-plus" />
                        {"Create"}
                      </button>
                    </div>
            </div>
          </div>
        </SideMenu>
      </div>
    );
  }
}