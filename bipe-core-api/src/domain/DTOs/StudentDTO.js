import {GetDisplayName} from '../services/studentServices';

export default class StudentDTO {

  constructor(
    name,
    nickname,
    socialName,
    createdAt,
    isActive,
    grade,
    totalPoints,
    currentPoints,
    tier
  ) {
    this.name = name;
    this.nickname = nickname;
    this.socialName = socialName;
    this.createdAt = createdAt;
    this.isActive = isActive;
    this.grade = grade;
    this.points = {
      total: totalPoints,
      current: currentPoints
    };
    this.tier = tier;

    this.displayName = GetDisplayName(this);
  }

}