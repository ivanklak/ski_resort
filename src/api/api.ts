import {
  VisitorType,
  CoachType,
  SkiPassType
} from "./../components/Types/types";
import axios from "axios";
import Cookies from "js-cookie";
import {
  NewVisitorType,
  UpdateVisitorType,
  NewCoachType
} from "../components/Types/types";

export const tokenAPI = {
  async getToken(username: string, password: string) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic c2tpcmVzb3J0OnNlY3JldA==");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    urlencoded.append("grant_type", "password");

    let requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    const response = await fetch(
      "http://192.168.235.8:7001/oauth/token",
       requestOptions
    );
    const result = await response.json();
    return result;
  }
};

const instance = axios.create({
  baseURL: "http://192.168.235.8:7001"
});

const authToken = () => {
  const freshToken = Cookies.get("token");
  const auth = freshToken ? `Bearer ${freshToken}` : null;
  return auth;
};

export enum StatusEnum {
  Succes = 200,
  Error = 400
}

type GetVisitorsType = Array<VisitorType>;
type GetCoachesType = Array<CoachType>;
type GetSkipassesType = Array<SkiPassType>;
type GetImage = string;
type CreateType = {
  status: StatusEnum;
};
type DeleteType = {
  status: StatusEnum;
};
type UpdateType = {
  status: StatusEnum;
};
type AddCoachType = {
  status: StatusEnum;
};

export const visitorsAPI = {
  getVizitors() {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance.get<GetVisitorsType>(`/visitor`).then(response => {
      return response.data;
    });
  },
  getVisitorsPerPage(pageNumber = 1, pageSize = 26) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .get<GetVisitorsType>(
        `/visitor/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .then(response => {
        return response.data;
      });
  },
  getImage(id: number) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance.get<GetImage>(`/img/visitor/${id}`).then(response => {
      return response;
    });
  },
  createVisitor(data: NewVisitorType) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .post<CreateType>(`/visitor`, {
        fullname: data.fullname,
        dateOfBirth: data.birthDay,
        skiPassExpirationTime: data.skiPassTime,
        sportType: data.sportType,
        photo: data.photo
      })
      .then(response => {
        return response;
      });
  },
  deleteVisitor(visitorId: number) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .delete<DeleteType>(`/visitor`, {
        params: {
          visitorId
        }
      })
      .then(response => {
        return response;
      });
  },
  updateVisitor(data: UpdateVisitorType) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .put<UpdateType>(`/visitor`, {
        id: data.id,
        fullname: data.fullname,
        dateOfBirth: data.birthDay,
        sportType: data.sportType,
        photo: data.photo,
        skiPass: data.skiPass
      })
      .then(response => {
        return response;
      });
  },
  addCoach(visitorId: number, coachId: number) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .post<AddCoachType>(`/visitor/addcoach`, null, {
        params: { visitorId, coachId }
      })
      .then(response => {
        return response;
      });
  }
};

export const coachesAPI = {
  getCoaches() {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance.get<GetCoachesType>(`/coach`).then(response => {
      return response.data;
    });
  },
  getCoachesPerPage(pageNumber = 1, pageSize = 26) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .get<GetCoachesType>(
        `/coach/page?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .then(response => {
        return response.data;
      });
  },
  createCoaches(data: NewCoachType) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .post<CreateType>(`/coach`, {
        fullname: data.fullname,
        dateOfBirth: data.birthDay,
        category: data.category,
        sportType: data.sportType,
        sex: data.sex,
        photo: data.photo,
        workExperience: data.workExperience
      })
      .then(response => {
        return response;
      });
  },
  deleteCoach(coachId: number) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .delete<DeleteType>(`/coach`, {
        params: {
          coachId
        }
      })
      .then(response => {
        return response;
      });
  },
  updateCoach(data: NewCoachType) {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance
      .put<UpdateType>(`/coach`, {
        id: data.coachId,
        photo: data.photo,
        fullname: data.fullname,
        dateOfBirth: data.birthDay,
        sportType: data.sportType,
        category: data.category,
        sex: data.sex,
        workExperience: data.workExperience
      })
      .then(response => {
        return response;
      });
  }
};

export const skipassesAPI = {
  getSkipassess() {
    instance.defaults.headers.common["Authorization"] = authToken();
    return instance.get<GetSkipassesType>(`/skipass`).then(response => {
      return response.data;
    });
  }
};
